import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button, Grid } from '@nextui-org/react'
import Image from 'next/image'
import voting from '../../public/voting.svg'
import ProposalCard from '../../components/ProposalCard'

// TODO show proposals
const Index: NextPage = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <Container fluid>
      <Text weight={'medium'} size={64} css={{ textAlign: 'center' }}>
        Proposals
      </Text>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        {list.map((l) => (
          <ProposalCard key={l} />
        ))}
        <ProposalCard />
      </Grid.Container>
    </Container>
  )
}

export default Index
