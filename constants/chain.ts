import { Chain } from "wagmi";

export const moonbase: Chain = {
  id: 1287,
  name: 'Moonbase Alpha',
  network: 'moonbase',
  nativeCurrency: {
    decimals: 18,
    name: 'Moonbase',
    symbol: 'DEV',
  },
  rpcUrls: {
    default: 'https://rpc.api.moonbase.moonbeam.network',
  },
  blockExplorers: {
    etherscan: { name: 'Moonscan', url: 'https://moonbase.moonscan.io/' },
    default: { name: 'Moonscan', url: 'https://moonbase.moonscan.io/' },
  },
}