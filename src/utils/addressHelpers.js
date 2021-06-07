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

export const getLotteryAddress = (chainId = 3) => {
  return addresses.lottery[chainId]
}

export const getLotteryNftAddress = (chainId = 3) => {
  return addresses.lotteryNFT[chainId]
}

export const getLqdrAddress = (chainId = 3) => {
  return addresses.LQDR[chainId]
}