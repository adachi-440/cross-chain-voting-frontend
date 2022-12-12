import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { fetchSigner, erc20ABI } from '@wagmi/core'
import DEPLOYMENTS from '../constants/depolyments.json'

export const useTokenAmount = () => {
  // const signer = await fetchSigner()

  const [tokenAmount, setTokenAmount] = useState<number>(0)

  // const getContract = async () => {
  //   try {
  //     if (signer) {
  //       const contractAddress = DEPLOYMENTS.oft[signer.getChainId.toString() as keyof typeof DEPLOYMENTS.oft]
  //       const oft = new ethers.Contract(contractAddress, erc20ABI, signer)
  //       const signerAddress = await signer.getAddress()
  //       const balance: BigNumber = await oft.balanceOf(signerAddress)
  //       setTokenAmount(balance.toNumber())
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  useEffect(() => {
    // getContract()
  }, [])
  return tokenAmount
}
