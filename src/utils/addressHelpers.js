import addresses from '../config/constants/contracts'

// const chainId = process.env.REACT_APP_CHAIN_ID
// const chainId = 3

export const getMasterChefAddress = (chainId = 3) => {
  return addresses.MasterChef[chainId]
}

export const getMulticallAddress = (chainId = 3) => {
  return addresses.MulltiCall[chainId]
}