import {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} from "@axelar-network/axelarjs-sdk";
import { BigNumber, ethers } from "ethers";
import ABI from "../constants/abis/cross-chain-router.json"
import ROUTERS from '../constants/router.json'

export const estimateFeeByAxelar = async (srcChainId: number): Promise<BigNumber> => {
  const sdk = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  })

  let src

  switch (srcChainId) {
    case 1287:
      src = "moonbeam"
      break;
    case 421613:
      src = "arbitrum"
      break;
    default:
      src = "moonbeam"
      break;
  }

  let fee = await sdk.estimateGasFee(
    src,
    EvmChain.POLYGON,
    GasToken.GLMR
  );
  return BigNumber.from(fee)
}

export const estimateFeeByLayerZero = async (srcChainId: number, signer: ethers.Signer, amount: BigNumber, flag: number, yes?: boolean, proposalId?: number): Promise<BigNumber> => {
  const router = ROUTERS[srcChainId.toString() as keyof typeof ROUTERS];
  const endpoint = new ethers.Contract(
    router,
    ABI,
    signer
  )

  let payload
  if (flag === 1) {
    const c = ethers.utils.defaultAbiCoder.encode(["boolean", "address", "uint256"], [yes, await signer.getAddress(), proposalId]);
    const callData = ethers.utils.defaultAbiCoder.encode(["uint256", "bytes"], [flag, c]);
    payload = ethers.utils.defaultAbiCoder.encode(["address", "bytes"], [router, callData]);
  } else {
    const c = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [amount, await signer.getAddress()]);
    const callData = ethers.utils.defaultAbiCoder.encode(["uint256", "bytes"], [flag, c]);
    payload = ethers.utils.defaultAbiCoder.encode(["address", "bytes"], [router, callData]);
  }


  const fees: BigNumber[] = await endpoint.estimateSendFee(10109, payload, false)
  const fee: BigNumber = fees[0]
  return fee
}
