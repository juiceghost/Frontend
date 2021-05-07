import addresses from '../config/constants/contracts'

export const getMasterChefAddress = (chainId = 3) => {
  return addresses.MasterChef[chainId]
}
export const getSushiAddress = (chainId = 3) => {
  return addresses.Sushi[chainId]
}

export const getMulticallAddress = (chainId = 3) => {
  return addresses.MulltiCall[chainId]
}