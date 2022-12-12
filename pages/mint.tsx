import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button, Input, Grid } from '@nextui-org/react'
import styles from '../styles/Top.module.css'
import Image from 'next/image'
import voting from '../public/voting.svg'
import { useEffect, useState } from 'react'
import { useVoteContract } from '../hooks/useVoteContract'
import { useTokenAmount } from '../hooks/useTokenAmount'
import { BigNumber, ethers } from 'ethers'
import { getAccount } from '@wagmi/core'
import { showToast } from '../utils/toast'
import { useAccount, useBalance, useContract, useNetwork, useSigner } from 'wagmi'
import DEPLOYMENTS from '../constants/depolyments.json'
import OFT_ABI from '../constants/abis/oft.json'
import { parseEther } from 'ethers/lib/utils.js'

const Mint: NextPage = () => {
  const [balance, setBalance] = useState<string>('0')
  const [stakeBalance, setStakeBalance] = useState<string>('0')
  const [mintAmount, setMintAmount] = useState<number>(0)
  const [stakeAmount, setStakeAmount] = useState<number>(0)

  const contract = useVoteContract()
  const { data: signer } = useSigner()

  const { chain } = useNetwork()
  const chainId = chain?.id

  const oftAddress = DEPLOYMENTS.oft[chain?.id.toString() as keyof typeof DEPLOYMENTS.oft]
  const oftContract = useContract({
    address: oftAddress,
    abi: OFT_ABI,
    signerOrProvider: signer,
  })

  console.log(oftAddress)

  const { address } = useAccount()
  const { data } = useBalance({
    address,
    token: oftAddress as `0x${string}`,
    chainId: chainId,
  })

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
        const tx = await oftContract.mint(address, parseEther(mintAmount.toString()))
        await tx.wait()
        showToast(1, 'Complete minting \n ')
      }
    } catch (error) {
      console.log(error)
      showToast(2, 'Mint Failed')
    }
  }
  const stake = async () => {
    try {
      if (contract && oftContract) {
        const addr = contract.address as `0x${string}`
        let tx = await oftContract.approve(addr, BigNumber.from(parseEther(stakeAmount.toString())).mul(2))
        await tx.wait()
        showToast(1, 'Complete approving')
        if (chainId !== 80001) {
          tx = await contract.stake(parseEther(stakeAmount.toString()), 1, 80001)
          await tx.wait()
          showToast(1, 'Complete staking')
        } else {
          tx = await contract.stake(stakeAmount)
          await tx.wait()
          showToast(1, 'Complete staking')
        }
      }
    } catch (error) {
      console.log(error)
      showToast(2, 'Failed')
    }
  }
  const withdraw = async () => {
    try {
      if (contract && oftContract) {
        let tx
        if (chainId !== 80001) {
          tx = await contract.withdraw(parseEther(stakeAmount.toString()), 1, 80001)
          await tx.wait()
          showToast(1, 'Complete withdrawing')
        } else {
          tx = await contract.withdraw(stakeAmount)
          await tx.wait()
          showToast(1, 'Complete withdrawing')
        }
      }
    } catch (error) {
      console.log(error)
      showToast(2, 'Failed')
    }
  }

  useEffect(() => {
    getStakeBalance()
    console.log(data)
    if (data !== undefined) {
      setBalance(ethers.utils.formatUnits(data.value._hex))
    }
  }, [contract, data])

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
                  onPress={() => stake()}
                >
                  Stake
                </Button>
                <Button
                  disabled={stakeBalance === '0'}
                  rounded
                  css={{
                    background: '#0841D4',
                  }}
                  onPress={() => withdraw()}
                >
                  Withdraw
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default Mint
