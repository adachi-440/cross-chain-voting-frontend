import type { NextPage } from 'next'
import { ToastContainer } from 'react-toastify'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import 'react-toastify/dist/ReactToastify.css'

interface LayoutProps {
  children?: React.ReactNode
}

// TODO implenent Header
const Header = () => {
  return <ConnectButton />
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
