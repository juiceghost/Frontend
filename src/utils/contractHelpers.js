import web3NoAccount from './web3'
import ERC20Abi from '../config/abi/erc20.json'
import MasterChefAbi from '../config/abi/masterchef.json'
import MiniChefAbi from '../config/abi/minichef.json'
import SushiAbi from '../config/abi/sushi.json'
import LotteryAbi from '../config/abi/lottery.json'
import XLQDRAbi from '../config/abi/xlqdr.json'
import feeDistributorAbi from '../config/abi/feeDistributor.json'
import ftmDistributorAbi from '../config/abi/ftmDistributor.json'
import rewarderAbi from '../config/abi/rewarder.json'
import { getMasterChefAddress, getLotteryAddress, getXLqdrAddress, getFeeDistributorAddress, getFTMDistributorAddress, getMiniChefAddress, getRewarderAddress, getFtmRewarderAddress } from './addressHelpers'
import { getSushiAddress } from './addressHelpers'

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount
    return new _web3.eth.Contract(abi, address)
}

export const getMasterChefContract = (web3, chainId) => {
    return getContract(MasterChefAbi, getMasterChefAddress(chainId), web3)
}

export const getMiniChefContract = (web3, chainId) => {
    return getContract(MiniChefAbi, getMiniChefAddress(chainId), web3)
}

export const getSushiRouter = (web3, chainId) => {
    return getContract(SushiAbi, getSushiAddress(chainId), web3)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}

export const getLotteryContract = (web3, chainId) => {
    return getContract(LotteryAbi, getLotteryAddress(chainId), web3)
}

export const getXLQDRContract = (web3, chainId) => {
    return getContract(XLQDRAbi, getXLqdrAddress(chainId), web3)
}

export const getFeeDistributorContract = (web3, chainId) => {
    return getContract(feeDistributorAbi, getFeeDistributorAddress(chainId), web3)
}

export const getFTMDistributorContract = (web3, chainId) => {
    return getContract(ftmDistributorAbi, getFTMDistributorAddress(chainId), web3)
}

export const getRewarderContract = (web3, chainId) => {
    return getContract(rewarderAbi, getRewarderAddress(chainId), web3)
}

export const getFtmRewarderContract = (web3, chainId) => {
    return getContract(rewarderAbi, getFtmRewarderAddress(chainId), web3)
}
