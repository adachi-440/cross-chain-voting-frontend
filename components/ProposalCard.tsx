import { Card, Row, Text, Col, Grid, Badge } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { Proposal } from '../utils/proposalType'
import { converUnixToDate } from '../utils/util'
import type { NextPage } from 'next'

interface ProposalData {
  proposal: Proposal
}

const ProposalCard: NextPage<ProposalData> = (props) => {
  const router = useRouter()

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
        <Card
          isPressable
          isHoverable
          css={{ mw: '600px' }}
          onPress={() => router.push(`/proposal/${props.proposal.id.toNumber()}`)}
        >
          <Card.Header>
            <Row gap={0} align={'center'}>
              <Col>
                <Text weight={'normal'} size={24}>
                  {props.proposal.title}
                </Text>
              </Col>
              <Col css={{ textAlign: 'end' }}>
                {converUnixToDate(props.proposal.expirationTime.toNumber()).getTime() > Date.now() ? (
                  <Badge enableShadow disableOutline color='success'>
                    Active
                  </Badge>
                ) : (
                  <Badge enableShadow disableOutline color='secondary'>
                    Finisihed
                  </Badge>
                )}
              </Col>
            </Row>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: '$10' }}>
            <Text>{cutText(props.proposal.description)}</Text>
            {/* TODO if voting is comleted, display vote result here */}
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Text weight={'normal'} size={16}>
              Expire Date: {converUnixToDate(props.proposal.expirationTime.toNumber()).toDateString()}
            </Text>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  )
}

export default ProposalCard
