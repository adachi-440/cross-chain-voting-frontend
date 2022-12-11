import type { NextPage } from 'next'
import { Proposal } from '../utils/proposalType'
import { Container, Card, Row, Text, Col, Spacer, Grid, Button, Badge } from '@nextui-org/react'
import { useRouter } from 'next/router'

// TODO use Proposal Interface
const ProposalCard: NextPage = () => {
  const router = useRouter()
  const text =
    'Stargate should become a hub for LayerZero assets (OFT tokens). Stargate should enable OFT tokens as an option for users, allowing a wider variety of tokens able to be bridged through Stargate. This will result in users having a singular easy destination to move many tokens cross chain allowing the protocol to also capture more long tail token flow without the need for more STG emissions. Proposal Stargate should add OFT tokens to the UI enabling more tokens to be transferred through Stargate.'

  const cutText = (txt: string) => {
    const txtList = txt.split(' ')
    if (txtList.length > 30) {
      let result = ''
      for (let index = 0; index < 30; index++) {
        const word = txtList[index]
        result = result + word + ' '
      }
      result = result + '...'
      return result
    } else {
      return txt
    }
  }

  return (
    <>
      <Grid sm={12} md={5}>
        <Card isPressable isHoverable css={{ mw: '600px' }} onPress={() => router.push('/proposal/1')}>
          <Card.Header>
            <Row gap={0} align={'center'}>
              <Col>
                <Text weight={'normal'} size={24}>
                  Proposal Title
                </Text>
              </Col>
              <Col css={{ textAlign: 'end' }}>
                {/* TODO Need a function to check if active */}
                <Badge enableShadow disableOutline color='success'>
                  Active
                </Badge>
              </Col>
            </Row>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: '$10' }}>
            <Text>{cutText(text)}</Text>
            {/* TODO if voting is comleted, display vote result here */}
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Text weight={'normal'} size={16}>
              Expire Date: 2022/12/11
            </Text>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  )
}

export default ProposalCard
