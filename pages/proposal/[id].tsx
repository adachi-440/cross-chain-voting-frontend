import { Container, Card, Row, Text, Col, Spacer, Button, Grid, Progress, Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { ChainId } from '@biconomy/core-types'
import SmartAccount from '@biconomy/smart-account'
import styles from '../../styles/Vote.module.css'
import { Proposal } from '../../utils/proposalType'
import { getVoteContract } from '../../utils/provider'
import { showToast } from '../../utils/toast'
import { converUnixToDate } from '../../utils/util'
import { useVoteContract } from '../../hooks/useVoteContract'
import { estimateFeeByLayerZero, estimateFeeByAxelar } from '../../utils/estimateFee'
import LoadingModal from '../../components/LoadingModal'
import VOTING_ABI from '../../constants/abis/voting.json'
import type { NextPage } from 'next'

interface VoteContent {
  yesVotes: number
  noVotes: number
}

interface Window {
  ethereum?: import('ethers').providers.ExternalProvider
}

const Vote: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [balance, setBalance] = useState<string>('0')
  const { data: signer } = useSigner()
  const contract = useVoteContract(signer)
  const { chain } = useNetwork()
  const chainId = chain?.id
  const [loading, setLoading] = useState(true)
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)

  const [proposal, setProposal] = useState<Proposal>({
    id: BigNumber.from('0'),
    title: '',
    status: '',
    description: '',
    yesVotes: BigNumber.from('0'),
    noVotes: BigNumber.from('0'),
    creater: '',
    expirationTime: BigNumber.from('0'),
    voters: [],
    voterInfo: [],
  })

  const [voteCount, setVoteCount] = useState<VoteContent>({ yesVotes: 0, noVotes: 0 })

  const { address } = useAccount()

  const [visible, setVisible] = useState(false)

  const closeHandler = () => {
    setVisible(false)
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
        setBalance(ethers.utils.formatUnits(result._hex))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProposal = async () => {
    try {
      const contract = getVoteContract()
      if (contract && id !== undefined) {
        const pro: Proposal = await contract.getProposal(id)
        setProposal(pro)
        const vote: BigNumber[] = await contract.countVotes(id)
        setVoteCount({ yesVotes: parseInt(vote[0]._hex), noVotes: parseInt(vote[1]._hex) })
        console.log(parseInt(vote[0]._hex))
      }
    } catch (error) {
      console.log(error)
      showToast(2, 'Failed to get data')
    }
  }

  const vote = async (yes: boolean, protocolId: number) => {
    let tx
    try {
      if (contract && chainId && signer && id) {
        setVisible(true)
        if (chainId !== 80001) {
          let fee = BigNumber.from(0)
          if (protocolId === 3) {
            fee = await estimateFeeByLayerZero(chainId, signer, fee, 1, yes, parseInt(proposal.id._hex))
          } else if (protocolId === 4) {
            fee = await estimateFeeByAxelar(1287)
          }
          tx = await contract.requestVote(yes, protocolId, 80001, id)
        } else {
          if (smartAccount) {
            const contractInterface = new ethers.utils.Interface(VOTING_ABI)
            const data = contractInterface.encodeFunctionData('castVote', [id, yes, address])
            tx = {
              to: contract.address,
              data,
            }
            const txId = await smartAccount.sendGasLessTransaction({
              transaction: tx,
            })
            console.log(txId)
          }
        }
        setVisible(false)
        showToast(1, 'Voting Success')
      }
    } catch (error) {
      setVisible(false)
      console.log(error)
      showToast(2, 'Failed to vote')
    }
  }

  const initMetaTx = async () => {
    const w = window as Window
    if (!chainId || w.ethereum == undefined) return
    const provider = new ethers.providers.Web3Provider(w.ethereum)
    const smartAccount = new SmartAccount(provider, {
      activeNetworkId: ChainId.POLYGON_MUMBAI,
      supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
      networkConfig: [
        {
          chainId: ChainId.POLYGON_MUMBAI,
          dappAPIKey: '59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3', // Get one from Paymaster Dashboard
          // customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
        },
      ],
    })
    await smartAccount.init()
    const context = smartAccount.getSmartAccountContext()
    console.log(`smartAccount Address: ${context.baseWallet.getAddress()}`)
    setSmartAccount(smartAccount)
    setLoading(false)
  }

  useEffect(() => {
    getProposal()
    getStakeBalance()
  }, [id, contract])

  useEffect(() => {
    if (chain?.id === 80001) {
      initMetaTx()
    } else {
      setLoading(false)
    }
  }, [chain])

  return (
    <Container fluid>
      <Text weight={'medium'} size={64} css={{ textAlign: 'center' }}>
        Vote
      </Text>
      <Spacer y={2} />
      <Row gap={5}>
        <Col>
          <Card css={{ mw: '500px' }}>
            <Card.Header>
              <Text weight={'normal'} size={32}>
                {proposal.title}
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
              <Text>{proposal.description}</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Text weight={'normal'} size={16}>
                Expire Date:{' '}
                {proposal.expirationTime.toNumber() !== 0
                  ? converUnixToDate(proposal.expirationTime.toNumber()).toDateString()
                  : 0}
              </Text>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Text weight={'normal'} size={32}>
            You have: {balance} veToken
          </Text>
          <Spacer y={2} />
          {converUnixToDate(proposal.expirationTime.toNumber()).getTime() > Date.now() ? (
            <div>
              {!loading ? (
                <div>
                  <Button
                    rounded
                    shadow
                    css={{
                      background: '#0841D4',
                    }}
                    onPress={() => vote(true, 1)}
                  >
                    Vote &quot;Yes&quot;
                  </Button>
                  <Spacer y={1} />
                  <Button
                    rounded
                    shadow
                    css={{
                      background: '#0841D4',
                    }}
                    onPress={() => vote(false, 1)}
                  >
                    Vote &quot;No&quot;
                  </Button>
                  <Spacer y={2} />
                </div>
              ) : (
                <Loading
                  size='lg'
                  css={{
                    color: '#0841D4',
                  }}
                ></Loading>
              )}
            </div>
          ) : (
            <div></div>
          )}

          <Grid.Container xs={12} sm={8} gap={2}>
            <Grid>
              <Text weight={'normal'} size={20}>
                Yes
              </Text>
              <Progress
                className={styles.progress_bar}
                value={
                  voteCount.yesVotes !== 0 ? (voteCount.yesVotes / (voteCount.noVotes + voteCount.yesVotes)) * 100 : 0
                }
                size='lg'
                shadow
                css={{ width: '100%' }}
              />
            </Grid>
            <Grid>
              <Text weight={'normal'} size={20}>
                No
              </Text>
              <Progress
                color='error'
                value={
                  voteCount.noVotes !== 0 ? (voteCount.noVotes / (voteCount.noVotes + voteCount.yesVotes)) * 100 : 0
                }
                size='lg'
                shadow
              />
            </Grid>
          </Grid.Container>
        </Col>
      </Row>
      <LoadingModal visible={visible} onClose={closeHandler} />
    </Container>
  )
}

export default Vote
