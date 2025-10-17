// TypeScript Types for SafeChain

export interface SOSAlert {
  id: string
  userId: string
  latitude: number
  longitude: number
  timestamp: number
  message: string
  mediaHash?: string // IPFS hash
  blockchainTxHash: string
  status: "active" | "responding" | "resolved"
  responders: string[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  walletAddress: string
  name: string
  email: string
  phone: string
  emergencyContacts: string[]
  helpTokenBalance: number
  reputation: number
  verifiedResponder: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Video {
  id: string
  title: string
  description: string
  instructor: string
  duration: number
  category: string
  ipfsHash: string
  blockchainHash: string
  premium: boolean
  views: number
  rating: number
  createdAt: Date
}

export interface Responder {
  id: string
  walletAddress: string
  name: string
  organization: string
  credentialProof: string
  verifiedOn: Date
  helpTokensEarned: number
  respondedAlerts: number
  rating: number
}

export interface HELPToken {
  id: string
  symbol: "HELP"
  assetId: number // Algorand ASA ID
  totalSupply: number
  decimals: number
  creator: string
}
