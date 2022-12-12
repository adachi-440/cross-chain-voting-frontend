import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button, Grid, Progress } from '@nextui-org/react'
import styles from '../../styles/Vote.module.css'
import Image from 'next/image'
import voting from '../../public/voting.svg'
import { Proposal } from '../../utils/proposalType'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getVoteContract } from '../../utils/provider'
import { showToast } from '../../utils/toast'
import { converUnixToDate } from '../../utils/util'
import { BigNumber } from 'ethers'
import { useTokenAmount } from '../../hooks/useTokenAmount'
import { useContract } from '../../hooks/useContract'

const Vote: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const tokenAmount = useTokenAmount()
  // const { chainId, contract } = useContract()

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

  const getProposal = async () => {
    const contract = getVoteContract()
    if (contract && id !== undefined) {
      const result: Proposal = await contract.getProposal(id)
      console.log(result)
      setProposal(result)
    }
    try {
    } catch (error) {
      console.log(error)
      showToast(2, 'Failed to get data')
    }
  }

  // TODO
  const vote = async (yes: boolean) => {
    // let tx
    // try {
    //   if (contract) {
    //     if (chainId !== 80001) {
    //       tx = await contract.requestVote(yes, 1, 80001, id)
    //     } else {
    //       tx = await contract.castVote(id, yes)
    //     }
    //     await tx.wait()
    //     showToast(1, 'Voting Success')
    //   }
    // } catch (error) {
    //   console.log(error)
    //   showToast(2, 'Failed to vote')
    // }
  }

  useEffect(() => {
    getProposal()
  }, [id])

  return (
    <Container fluid>
      <Text weight={'medium'} size={64} css={{ textAlign: 'center' }}>
        Vote
      </Text>
      <Spacer y={2} />
      <Row gap={6}>
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
            You have: {tokenAmount.toString()} veToken
          </Text>
          <Spacer y={2} />
          {converUnixToDate(proposal.expirationTime.toNumber()).getTime() > Date.now() ?? (
            <div>
              <Button
                rounded
                shadow
                css={{
                  background: '#0841D4',
                }}
                onPress={() => vote(true)}
              >
                Vote "Yes"
              </Button>
              <Spacer y={1} />
              <Button
                rounded
                shadow
                css={{
                  background: '#0841D4',
                }}
                onPress={() => vote(false)}
              >
                Vote "No"
              </Button>
              <Spacer y={2} />
            </div>
          )}

          <Grid.Container xs={12} sm={8} gap={2}>
            <Grid>
              <Text weight={'normal'} size={20}>
                Yes
              </Text>
              <Progress
                className={styles.progress_bar}
                value={
                  proposal.yesVotes.toNumber() !== 0
                    ? proposal.yesVotes.div(proposal.noVotes.add(proposal.yesVotes)).mul(100).toNumber()
                    : 0
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
                  proposal.noVotes.toNumber() !== 0
                    ? proposal.noVotes.div(proposal.noVotes.add(proposal.yesVotes)).mul(100).toNumber()
                    : 0
                }
                size='lg'
                shadow
              />
            </Grid>
          </Grid.Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Vote
