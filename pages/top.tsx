import { Container, Row, Text, Col, Spacer, Button } from '@nextui-org/react'
import Image from 'next/image'
import voting from '../public/voting.svg'
import type { NextPage } from 'next'

// TODO this file is index.tsx
const Top: NextPage = () => {
  return (
    <Container fluid>
      <Row gap={6}>
        <Col>
          <Text weight={'bold'} size={40}>
            Gasless & Omnichain voting system
          </Text>
          <Spacer y={3} />
          <Text weight={'medium'} size={24}>
            Cross-chain messaging allows for on-chain voting from any chain.Users can participate in voting without
            worrying about gas costs.
          </Text>
          <Spacer y={2} />
          <Button
            auto
            rounded
            css={{
              background: '#0841D4',
            }}
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

export default Top
