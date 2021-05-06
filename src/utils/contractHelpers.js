import web3NoAccount from './web3'
import ERC20Abi from '../config/abi/erc20.json'
import MasterChefAbi from '../config/abi/masterchef.json'
import { getMasterChefAddress } from './addressHelpers'

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount
    return new _web3.eth.Contract(abi, address)
}

export const getMasterChefContract = (web3, chainId) => {
    return getContract(MasterChefAbi, getMasterChefAddress(chainId), web3)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}