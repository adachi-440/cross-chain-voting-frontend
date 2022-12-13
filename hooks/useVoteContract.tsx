import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { getProvider, fetchSigner } from '@wagmi/core'
import DEPLOYMENTS from '../constants/depolyments.json'
import VOTING_ABI from '../constants/abis/voting.json'
import VOTE_REQUEST_ABI from '../constants/abis/vote-request.json'

export const useVoteContract = (signer: any) => {
  const provider = getProvider()

  const [contract, setContract] = useState<ethers.Contract>()

  const fetchContract = async () => {
    try {
      if (provider) {
        const signer = await fetchSigner()
        console.log(signer)
        if (signer) {
          console.log('test')
          const chainId = (await provider.getNetwork()).chainId
          let contract
          if (chainId !== 80001) {
            const address =
              DEPLOYMENTS['voting-request'][chainId.toString() as keyof typeof DEPLOYMENTS['voting-request']]
            console.log(address)
            contract = new ethers.Contract(address, VOTE_REQUEST_ABI, signer)
          } else {
            const address = DEPLOYMENTS.voting
            contract = new ethers.Contract(address, VOTING_ABI, signer)
          }
          setContract(contract)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchContract()
  }, [provider, signer])
  return contract
}
