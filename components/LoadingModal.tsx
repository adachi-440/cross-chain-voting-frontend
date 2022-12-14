import React from 'react'
import { Modal, Text, Loading } from '@nextui-org/react'
import { NextPage } from 'next/types'

interface Props {
  visible: boolean
  onClose: () => void
}
const LoadingModal: NextPage<Props> = (props) => {
  return (
    <div>
      <Modal closeButton aria-labelledby='modal-title' open={props.visible} onClose={props.onClose}>
        <Modal.Body>
          <Loading
            size='lg'
            css={{
              color: '#0841D4',
            }}
          >
            <Text weight={'medium'} size={20} css={{ textAlign: 'center' }}>
              Transaction Waiting...
            </Text>
          </Loading>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default LoadingModal
