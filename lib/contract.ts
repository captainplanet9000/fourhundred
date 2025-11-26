import { FourHundredAbi } from '@/lib/abi/FourHundred'
import { Address } from 'viem'

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xA2E2eA98302e4Db471d16862468A0AFB0256a589') as Address

export const contract = {
  address: CONTRACT_ADDRESS,
  abi: FourHundredAbi,
} as const
