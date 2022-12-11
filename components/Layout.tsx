import type { NextPage } from 'next'
import { ToastContainer } from 'react-toastify'

interface LayoutProps {
  children?: React.ReactNode
}

// TODO implenent Header
const Header = () => {
  return <h3>This is Header</h3>
}

const Layout: NextPage = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <ToastContainer />
    </div>
  )
}

export default Layout
