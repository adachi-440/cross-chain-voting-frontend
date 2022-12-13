import '../styles/globals.css'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme as rainbowDarkTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { optimismGoerli, arbitrumGoerli, polygonMumbai } from 'wagmi/chains'

import { publicProvider } from 'wagmi/providers/public'
import Layout from '../components/Layout'
import { moonbase } from '../constants/chain'
import type { AppProps } from 'next/app'

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {}, // optional
  },
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}, // optional
  },
})

// Rainbow Kit
const { chains, provider } = configureChains(
  [moonbase, polygonMumbai, optimismGoerli, arbitrumGoerli],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme='system'
      attribute='class'
      value={{
        dark: darkTheme.className,
        light: lightTheme.className,
      }}
    >
      <NextUIProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={rainbowDarkTheme()} initialChain={moonbase}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default MyApp
