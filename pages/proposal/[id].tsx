import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button } from '@nextui-org/react'
import styles from '../styles/Vote.module.css'
import Image from 'next/image'
import voting from '../../public/voting.svg'
import { Proposal } from '../../utils/proposalType'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getVoteContract } from '../../utils/provider'
import { showToast } from '../../utils/toast'
import { converUnixToDate } from '../../utils/util'
import { BigNumber } from 'ethers'

// TODO get proposal id via useRouter
const Vote: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
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
          <Image src={voting} alt='Picture of the author' width={400} height={400} />
        </Col>
      </Row>
    </Container>
  )
}

export default Vote
