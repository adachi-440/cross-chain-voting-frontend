import { Container, Card, Row, Text, Spacer, Button, Input, Grid } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useBalance, useContract, useNetwork, useSigner } from 'wagmi'
import { parseEther } from 'ethers/lib/utils.js'
import { useVoteContract } from '../hooks/useVoteContract'
import { showToast } from '../utils/toast'
import DEPLOYMENTS from '../constants/depolyments.json'
import OFT_ABI from '../constants/abis/oft.json'
import { estimateFeeByAxelar, estimateFeeByLayerZero } from '../utils/estimateFee'
import LoadingModal from '../components/LoadingModal'
import type { NextPage } from 'next'

const Mint: NextPage = () => {
  const [balance, setBalance] = useState<string>('0')
  const [stakeBalance, setStakeBalance] = useState<string>('0')
  const [mintAmount, setMintAmount] = useState<number>(0)
  const [stakeAmount, setStakeAmount] = useState<number>(0)

  const { data: signer } = useSigner()
  const contract = useVoteContract(signer)

  const { chain } = useNetwork()
  const chainId = chain?.id

  const oftAddress = DEPLOYMENTS.oft[chain?.id.toString() as keyof typeof DEPLOYMENTS.oft]
  const oftContract = useContract({
    address: oftAddress,
    abi: OFT_ABI,
    signerOrProvider: signer,
  })

  const { address, isConnected } = useAccount()
  const { data } = useBalance({
    address,
    token: oftAddress as `0x${string}`,
    chainId: chainId,
  })

  const [visible, setVisible] = useState(false)

  const closeHandler = () => {
    setVisible(false)
  }

  const inputMintAmount = (e: { target: { name: any; value: any } }) => {
    setMintAmount(e.target.value)
  }

  const inputStakeAmount = (e: { target: { name: any; value: any } }) => {
    setStakeAmount(e.target.value)
  }

  const getStakeBalance = async () => {
    try {
      if (contract) {
        let result: BigNumber
        if (chainId !== 80001) {
          result = await contract.balanceOf(address)
        } else {
          result = await contract.getBalanceOfEachChain(chainId)
        }
        setStakeBalance(ethers.utils.formatUnits(result._hex))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const mint = async () => {
    try {
      if (oftContract) {
        setVisible(true)
        const tx = await oftContract.mint(address, parseEther(mintAmount.toString()), { gasLimit: 2000000 })
        await tx.wait()
        showToast(1, 'Complete minting \n ')
      }
    } catch (error) {
      console.log(error)
      setVisible(false)
      showToast(2, 'Mint Failed')
    }
    setVisible(false)
  }
  const stake = async (protocolId: number) => {
    try {
      let tx
      if (contract && oftContract && chainId && signer) {
        setVisible(true)
        const parsedAmount = parseEther(stakeAmount.toString())
        const addr = contract.address as `0x${string}`
        tx = await oftContract.approve(addr, BigNumber.from(parsedAmount).mul(2))
        await tx.wait()
        showToast(1, 'Complete approving')
        if (chainId !== 80001) {
          let fee = BigNumber.from(0)
          if (protocolId === 3) {
            fee = await estimateFeeByLayerZero(chainId, signer, parsedAmount, 2)
          } else if (protocolId === 4) {
            fee = await estimateFeeByAxelar(1287)
          }
          const tx = await contract.stake(parsedAmount, protocolId, 80001, { value: fee, gasLimit: 2000000 })
          await tx.wait()
          showToast(1, 'Complete staking')
        } else {
          tx = await contract.stake(parsedAmount)
          await tx.wait()
          showToast(1, 'Complete staking')
        }
        setVisible(false)
        getStakeBalance()
      }
    } catch (error) {
      console.log(error)
      setVisible(false)
      showToast(2, 'Failed')
    }
  }
  const withdraw = async (protocolId: number) => {
    try {
      if (contract && oftContract && chainId && signer) {
        setVisible(true)
        const parsedAmount = parseEther(stakeAmount.toString())
        let tx
        if (chainId !== 80001) {
          let fee = BigNumber.from(0)
          if (protocolId === 3) {
            fee = await estimateFeeByLayerZero(chainId, signer, parsedAmount, 3)
          } else if (protocolId === 4) {
            fee = await estimateFeeByAxelar(1287)
          }
          tx = await contract.withdraw(parseEther(stakeAmount.toString()), protocolId, 80001, {
            value: fee,
            gasLimit: 2000000,
          })
          await tx.wait()
          showToast(1, 'Complete withdrawing')
        } else {
          tx = await contract.withdraw(parsedAmount)
          await tx.wait()
          setVisible(false)
          showToast(1, 'Complete withdrawing')
        }
      }
    } catch (error) {
      console.log(error)
      setVisible(false)
      showToast(2, 'Failed')
    }
    getStakeBalance()
  }

  useEffect(() => {
    console.log(contract)
    getStakeBalance()
    if (data !== undefined) {
      setBalance(ethers.utils.formatUnits(data.value._hex))
    }
  }, [contract, data, isConnected])

  return (
    <Container fluid>
      <Text weight={'medium'} size={64} css={{ textAlign: 'center' }}>
        Mint and Stake
      </Text>
      <Text weight={'normal'} size={24} css={{ padding: '4px', textAlign: 'center' }}>
        Current Balance : {balance}
      </Text>
      <Text weight={'normal'} size={24} css={{ padding: '4px', textAlign: 'center' }}>
        Current Stake : {stakeBalance}
      </Text>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        <Grid sm={12} md={5}>
          <Card css={{ mw: '500px' }}>
            <Card.Header>
              <Text weight={'normal'} size={24} css={{ padding: '4px' }}>
                Mint
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
              <Input label='Amount' placeholder='100000' onChange={inputMintAmount} />
            </Card.Body>
            <Card.Divider />
            <Card.Footer
              css={{
                padding: '16px 10px',
              }}
            >
              <Button
                rounded
                css={{
                  background: '#0841D4',
                }}
                onPress={() => mint()}
              >
                Mint
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid sm={12} md={5}>
          <Card css={{ mw: '500px' }}>
            <Card.Header>
              <Text weight={'normal'} size={24} css={{ padding: '4px' }}>
                Stake and Withdraw
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
              <Input label='Amount' placeholder='100000' onChange={inputStakeAmount} />
            </Card.Body>
            <Card.Divider />
            <Card.Footer
              css={{
                padding: '16px 10px',
              }}
            >
              <Row justify='space-around'>
                <Button
                  rounded
                  css={{
                    background: '#0841D4',
                  }}
                  onPress={() => stake(1)}
                >
                  Stake
                </Button>
                <Button
                  disabled={stakeBalance === '0'}
                  rounded
                  css={{
                    background: '#0841D4',
                  }}
                  onPress={() => withdraw(1)}
                >
                  Withdraw
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <LoadingModal visible={visible} onClose={closeHandler} />
    </Container>
  )
}

export default Mint
