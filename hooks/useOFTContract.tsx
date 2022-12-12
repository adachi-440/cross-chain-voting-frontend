import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { getProvider, fetchSigner, erc20ABI } from '@wagmi/core'
import DEPLOYMENTS from '../constants/depolyments.json'

export const useOFTContract = () => {
  const provider = getProvider()

  const [contract, setContract] = useState<ethers.Contract>()

  const fetchContract = async () => {
    try {
      if (provider) {
        const signer = await fetchSigner()
        if (signer) {
          const chainId = (await provider.getNetwork()).chainId
          const address = DEPLOYMENTS.oft[chainId.toString() as keyof typeof DEPLOYMENTS.oft]
          const contract = new ethers.Contract(address, erc20ABI, signer)
          setContract(contract)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchContract()
  }, [provider])
  return contract
}
