import { useState } from 'react'
import { ethers } from 'ethers'
import { ChainId } from '@biconomy/core-types'
import SocialLogin from '@biconomy/web3-auth'
import SmartAccount from '@biconomy/smart-account'
import { Button } from '@nextui-org/react'
import { NextPage } from 'next'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import VOTING_ABI from '../constants/abis/voting.json'
import styles from '../styles/Home.module.css'
import DEPLOYMENTS from '../constants/depolyments.json'

interface Window {
  ethereum?: import('ethers').providers.ExternalProvider
}

const Scw: NextPage = () => {
  const { chain } = useNetwork()
  const chainId = chain?.id
  const voteRequestAddress = DEPLOYMENTS.voting
  const { address } = useAccount()

  // const [provider, setProvider] = useState<any>()
  // const [account, setAccount] = useState<string>()
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)
  const [scwAddress, setScwAddress] = useState('')
  const [scwLoading, setScwLoading] = useState(false)
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(null)

  const { data: signer } = useSigner()

  // const connectWeb3 = useCallback(async () => {
  //   if (typeof window === 'undefined') return
  //   console.log('socialLoginSDK', socialLoginSDK)
  //   if (socialLoginSDK?.provider) {
  //     const web3Provider = new ethers.providers.Web3Provider(socialLoginSDK.provider)
  //     const accounts = await web3Provider.listAccounts()
  //     setAccount(accounts[0])
  //     return
  //   }
  //   if (socialLoginSDK) {
  //     socialLoginSDK.showWallet()
  //     return socialLoginSDK
  //   }
  //   const sdk = new SocialLogin()
  //   await sdk.init(ethers.utils.hexValue(80001))
  //   setSocialLoginSDK(sdk)
  //   sdk.showConnectModal()
  //   sdk.showWallet()
  //   return socialLoginSDK
  // }, [socialLoginSDK])

  // if wallet already connected close widget
  // useEffect(() => {
  //   console.log('hidelwallet')
  //   if (socialLoginSDK && socialLoginSDK.provider) {
  //     socialLoginSDK.hideWallet()
  //   }
  // }, [account, socialLoginSDK])

  // after metamask login -> get provider event
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (account) {
  //       clearInterval(interval)
  //     }
  //     if (socialLoginSDK?.provider && !account) {
  //       connectWeb3()
  //     }
  //   }, 1000)
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [account, connectWeb3, socialLoginSDK])

  // const disconnectWeb3 = async () => {
  //   if (!socialLoginSDK || !socialLoginSDK.web3auth) {
  //     console.error('Web3Modal not initialized.')
  //     return
  //   }
  //   await socialLoginSDK.logout()
  //   socialLoginSDK.hideWallet()
  //   setAccount(undefined)
  //   setScwAddress('')
  // }

  const sendTransaction = async () => {
    setScwAddress('')
    setScwLoading(true)
    const w = window as Window
    if (!chainId || w.ethereum == undefined) return
    const provider = new ethers.providers.Web3Provider(w.ethereum)
    const smartAccount = new SmartAccount(provider, {
      activeNetworkId: ChainId.POLYGON_MUMBAI,
      supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
      networkConfig: [
        {
          chainId: ChainId.POLYGON_MUMBAI,
          dappAPIKey: '59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3', // Get one from Paymaster Dashboard
          // customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
        },
      ],
    })
    await smartAccount.init()
    const context = smartAccount.getSmartAccountContext()
    setScwAddress(context.baseWallet.getAddress())
    console.log(`smartAccount Address: ${context.baseWallet.getAddress()}`)
    setSmartAccount(smartAccount)

    const contractInterface = new ethers.utils.Interface(VOTING_ABI)
    const data = contractInterface.encodeFunctionData('castVote', [1, true, address])
    const tx = {
      to: voteRequestAddress,
      data,
    }

    // Dispatches the transaction on chain using relayer.
    // Below method will also make prompt for signing the transaction with connected EOA signer then communicate with REST Relayer
    const txId = await smartAccount.sendGasLessTransaction({
      transaction: tx,
    })

    console.log(txId)

    setScwLoading(false)
  }

  return (
    <div className={styles.container}>
      <Button onClick={() => sendTransaction()} shadow color='primary' className={styles.button}>
        Button
      </Button>
    </div>
  )
}

export default Scw
