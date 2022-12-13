import { ToastContainer } from 'react-toastify'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import 'react-toastify/dist/ReactToastify.css'
import { Navbar, Switch, useTheme } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import type { NextPage } from 'next'

interface LayoutProps {
  children?: React.ReactNode
}

const Header = () => {
  const { setTheme } = useNextTheme()
  const { isDark, type } = useTheme()
  return (
    <Navbar variant={'sticky'} isBordered>
      <Navbar.Brand>
        <Image width={300} src='https://i.ibb.co/nP58sy7/lohoho.png' alt='Default Image' objectFit='scale-down' />
      </Navbar.Brand>
      <Navbar.Content hideIn='xs'>
        <Navbar.Link href='/'>Top</Navbar.Link>
        <Navbar.Link href='/mint'>Mint</Navbar.Link>
        <Navbar.Link href='/proposal'>Proposals</Navbar.Link>
        <ConnectButton />
        <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
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
