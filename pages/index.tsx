import type { NextPage } from 'next'
import { Container, Card, Row, Text, Col, Spacer, Button } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import voting from '../public/voting.svg'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Container fluid>
      <Spacer y={3} />
      <Row gap={6}>
        <Col>
          <Text weight={'bold'} size={40}>
            Gasless & Omnichain voting system
          </Text>
          <Spacer y={2} />
          <Text weight={'medium'} size={24}>
            Cross-chain messaging allows for on-chain voting from any chain.Users can participate in voting without
            worrying about gas costs.
          </Text>
          <Spacer y={1} />
          <Button
            auto
            rounded
            css={{
              background: '#0841D4',
            }}
            onPress={() => router.push('/mint')}
          >
            Try Out
          </Button>
        </Col>
        <Col>
          <Image src={voting} alt='Picture of the author' width={400} height={400} />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
