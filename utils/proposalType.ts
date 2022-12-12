import { BigNumber } from "ethers"

export interface Proposal {
  id: BigNumber
  title: string
  status: string
  description: string
  yesVotes: BigNumber
  noVotes: BigNumber
  creater: string
  expirationTime: BigNumber
  voters: string[]
  voterInfo: VoteInfo[]
}

export interface VoteInfo {
  hasVoted: boolean
  vote: boolean
  weight: BigNumber
}

export interface ProposalInput {
  title: string
  description: string
  expirationTime: number
}
