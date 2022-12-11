import ethers from "ethers"
import DEPLOYMENTS from "../constants/depolyments.json"
import ABI from "../constants/abis/voting.json"


export const getMumbaiProvider = () => {
  const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.POLYGON_TESTNET_API_KEY);
  return provider
}

export const getVoteContract = () => {
  const provider = getMumbaiProvider()

  const contract = new ethers.Contract(DEPLOYMENTS.voting, ABI, provider)

  return contract
}
