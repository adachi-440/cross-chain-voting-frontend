import { Container, Card, Row, Text, Col, Spacer } from '@nextui-org/react'
import Image from 'next/image'
import voting from '../../public/voting.svg'
import { Proposal } from '../../utils/proposalType'
import type { NextPage } from 'next'

// TODO get proposal id via useRouter
const Vote: NextPage<Proposal> = (props) => {
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
                Proposal Title
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
              <Text>
                Stargate should become a hub for LayerZero assets (OFT tokens). Stargate should enable OFT tokens as an
                option for users, allowing a wider variety of tokens able to be bridged through Stargate. This will
                result in users having a singular easy destination to move many tokens cross chain allowing the protocol
                to also capture more long tail token flow without the need for more STG emissions. Proposal Stargate
                should add OFT tokens to the UI enabling more tokens to be transferred through Stargate.
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Text weight={'normal'} size={16}>
                Expire Date: 2022/12/11
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
