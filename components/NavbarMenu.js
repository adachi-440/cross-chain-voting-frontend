import { Navbar, Text } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { Image } from '@nextui-org/react'

const NavbarMenu = () => {
  return (
    <Navbar variant={'sticky'} color='inherit' isBordered>
      <Navbar.Brand>
        <Image width={300} src='https://i.ibb.co/nP58sy7/lohoho.png' alt='Default Image' objectFit='scale-down' />
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
