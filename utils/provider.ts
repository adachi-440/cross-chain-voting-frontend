import { ethers } from "ethers";
import DEPLOYMENTS from "../constants/depolyments.json"
import ABI from "../constants/abis/voting.json"
import * as dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : ""

export const getMumbaiProvider = () => {
  const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.POLYGON_TESTNET_API_KEY)
  return provider
}

export const getVoteContract = () => {
  const provider = getMumbaiProvider()

  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const signer = wallet.connect(provider);

  const contract = new ethers.Contract(DEPLOYMENTS.voting, ABI, signer)

  return contract
}
