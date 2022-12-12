import type { NextPage } from 'next'
import { ToastContainer } from 'react-toastify'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import 'react-toastify/dist/ReactToastify.css'
import { Navbar, Button, Text } from '@nextui-org/react'

interface LayoutProps {
  children?: React.ReactNode
}

// TODO implenent Header
const Header = () => {
  return (
    <Navbar variant={'sticky'} isBordered>
      <Navbar.Brand>
        <Text b hideIn='xs'>
          Yotsuha
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn='xs'>
        <Navbar.Link href='/'>Top</Navbar.Link>
        <Navbar.Link href='/mint'>Mint</Navbar.Link>
        <Navbar.Link href='/proposal'>Proposals</Navbar.Link>
        <ConnectButton />
      </Navbar.Content>
    </Navbar>
  )
}

const Layout: NextPage = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <ToastContainer />
    </div>
  )
}

export default Layout
