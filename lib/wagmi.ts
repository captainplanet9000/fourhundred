import { http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'fourhundred-temp'

const chains = [mainnet, sepolia] as const

const config = getDefaultConfig({
  appName: 'fourHundred Gallery',
  projectId,
  ssr: true,
  chains,
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_NETWORK_RPC_URL ||
      (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        : 'https://cloudflare-eth.com')
    ),
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_NETWORK_RPC_URL ||
      'https://rpc.sepolia.org'
    ),
  },
})

export default config