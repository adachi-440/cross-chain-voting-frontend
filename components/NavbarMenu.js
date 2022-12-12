import { Navbar, Text } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

const NavbarMenu = () => {
  return (
    <Navbar variant={'sticky'} color='inherit' isBordered>
      <Navbar.Brand>
        <Text b color='inherit' hideIn='xs'>
          Yotsuha
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn='xs'>
        <Navbar.Link href='mint'>Proposal</Navbar.Link>
        <Navbar.Link href='top'>Vote</Navbar.Link>
        <Button>ConnectWallet</Button>
      </Navbar.Content>
    </Navbar>
  )
}

export default NavbarMenu
