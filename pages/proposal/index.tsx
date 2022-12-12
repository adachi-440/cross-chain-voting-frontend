import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button, Grid } from '@nextui-org/react'
import Image from 'next/image'
import voting from '../../public/voting.svg'
import ProposalCard from '../../components/ProposalCard'
import { useEffect, useState } from 'react'
import { Proposal } from '../../utils/proposalType'
import { getVoteContract } from '../../utils/provider'
import { showToast } from '../../utils/toast'

const Index: NextPage = () => {
  const [proposals, setProposals] = useState<Proposal[]>([])

  const getProposals = async () => {
    const contract = getVoteContract()
    if (contract) {
      const result: Proposal[] = await contract.getAllProposals()
      console.log(result)
      setProposals(result)
    }
    try {
    } catch (error) {
      console.log(error)
      showToast(2, 'Failed to get data')
    }
  }

  useEffect(() => {
    getProposals()
  }, [])

  return (
    <Container fluid>
      <Text weight={'medium'} size={64} css={{ textAlign: 'center' }}>
        Proposals
      </Text>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        {proposals.map((pro) => (
          <ProposalCard key={pro.id.toNumber()} proposal={pro} />
        ))}
      </Grid.Container>
    </Container>
  )
}

export default Index
