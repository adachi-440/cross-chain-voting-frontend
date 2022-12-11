export interface Proposal {
  id: number
  title: string
  description: string
  yes: number
  no: number
  creater: string
  voters: string[]
  expirationTime: number
}

export interface ProposalInput {
  title: string
  description: string
  expirationTime: number
}
