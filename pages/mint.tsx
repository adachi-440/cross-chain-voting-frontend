import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button, Input, Grid } from '@nextui-org/react'
import styles from '../styles/Top.module.css'
import Image from 'next/image'
import voting from '../public/voting.svg'
import { useEffect, useState } from 'react'
import { useContract } from '../hooks/useContract'
import { useTokenAmount } from '../hooks/useTokenAmount'
import { BigNumber } from 'ethers'
import { getAccount } from '@wagmi/core'
import { useOFTContract } from '../hooks/useOFTContract'
import { showToast } from '../utils/toast'

const Mint: NextPage = () => {
  const balance = useTokenAmount()
  const [stakeBalance, setStakeBalance] = useState<number>(0)
  const [mintAmount, setMintAmount] = useState<number>(0)
  const [stakeAmount, setStakeAmount] = useState<number>(0)

  const { chainId, contract } = useContract()
  const oftContract = useOFTContract()

  const account = getAccount()

  const inputMintAmount = (e: { target: { name: any; value: any } }) => {
    setMintAmount(e.target.value)
  }

  const inputStakeAmount = (e: { target: { name: any; value: any } }) => {
    setStakeAmount(e.target.value)
  }

  const getStakeBalance = async () => {
    try {
      if (contract && account) {
        let result: BigNumber
        if (chainId !== 80001) {
          result = await contract.getBalanceOfEachChain(chainId)
        } else {
          result = await contract.balanceOf(account.address)
        }
        setStakeBalance(result.toNumber())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const mint = async () => {
    try {
      if (oftContract && account) {
        const tx = await oftContract.mint(account.address, mintAmount)
        await tx.wait()
        showToast(1, 'Complete minting')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const stake = async () => {
    try {
      if (contract && oftContract && account) {
        let tx = await oftContract.approve(contract.address, stakeAmount * 2)
        await tx.wait()
        showToast(1, 'Complete approving')
        if (chainId !== 80001) {
          tx = await contract.stake(stakeAmount, 1, 80001)
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
    }
  }
  const withdraw = async () => {
    try {
      if (contract && oftContract && account) {
        let tx
        if (chainId !== 80001) {
          tx = await contract.withdraw(stakeAmount, 1, 80001)
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
    }
  }

  useEffect(() => {
    getStakeBalance()
  }, [])

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
                  disabled={stakeAmount === 0}
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
