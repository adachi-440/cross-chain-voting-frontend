import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { optimismGoerli, arbitrumGoerli, polygonMumbai } from 'wagmi/chains'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import Layout from '../components/Layout'

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
const { chains, provider } = configureChains([optimismGoerli, arbitrumGoerli, polygonMumbai], [publicProvider()])

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
          <RainbowKitProvider chains={chains} theme={rainbowDarkTheme()}>
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
