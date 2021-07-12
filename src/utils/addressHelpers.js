import addresses from '../config/constants/contracts'

export const getMasterChefAddress = (chainId = 250) => {
  return addresses.MasterChef[chainId]
}

export const getSushiAddress = (chainId = 250) => {
  return addresses.Sushi[chainId]
}

export const getMulticallAddress = (chainId = 250) => {
  return addresses.MulltiCall[chainId]
}

export const getLotteryAddress = (chainId = 250) => {
  return addresses.lottery[chainId]
}

export const getLotteryNftAddress = (chainId = 250) => {
  return addresses.lotteryNFT[chainId]
}

export const getLqdrAddress = (chainId = 250) => {
  return addresses.LQDR[chainId]
}

export const getXLqdrAddress = (chainId = 250) => {
  return addresses.xlqdr[chainId]
}

export const getFeeDistributorAddress = (chainId = 250) => {
  return addresses.feeDistributor[chainId]
}

export const getFTMDistributorAddress = (chainId = 250) => {
  return addresses.ftmDistributor[chainId]
}

export const getWftmAddress = (chainId = 250) => {
  return addresses.wftm[chainId]
}