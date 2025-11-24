import { FourHundredAbi } from '@/lib/abi/FourHundred'
import { Address } from 'viem'

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000') as Address

export const contract = {
  address: CONTRACT_ADDRESS,
  abi: FourHundredAbi,
} as const
