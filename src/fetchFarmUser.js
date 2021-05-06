import BigNumber from 'bignumber.js'
import erc20ABI from './config/abi/erc20.json'
import masterchefABI from './config/abi/masterchef.json'
import multicall from './utils/multicall'
import { getMasterChefAddress } from './utils/addressHelpers'
import farmsConfig from './config/constants/farms'


export const fetchFarmUserAllowances = async (web3, account, chainId) => {
    const masterChefAdress = getMasterChefAddress(chainId)

    const calls = farmsConfig.map((farm) => {
        const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[chainId] : farm.lpAddresses[chainId]
        return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
    })

    const rawLpAllowances = await multicall(web3, erc20ABI, calls)
    const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
        return new BigNumber(lpBalance).toJSON()
    })
    return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (web3, account, chainId) => {
    const calls = farmsConfig.map((farm) => {
        const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[chainId] : farm.lpAddresses[chainId]
        return {
            address: lpContractAddress,
            name: 'balanceOf',
            params: [account],
        }
    })

    const rawTokenBalances = await multicall(web3, erc20ABI, calls)
    const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
        return new BigNumber(tokenBalance).toJSON()
    })
    return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (web3, account, chainId) => {
    const masterChefAdress = getMasterChefAddress(chainId)

    const calls = farmsConfig.map((farm) => {
        return {
            address: masterChefAdress,
            name: 'userInfo',
            params: [farm.pid, account],
        }
    })

    const rawStakedBalances = await multicall(web3, masterchefABI, calls)
    const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
        return new BigNumber(stakedBalance[0]._hex).toJSON()
    })
    return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (web3, account, chainId) => {
    const masterChefAdress = getMasterChefAddress(chainId)

    const calls = farmsConfig.map((farm) => {
        return {
            address: masterChefAdress,
            name: 'pendingEgg',
            params: [farm.pid, account],
        }
    })

    const rawEarnings = await multicall(web3, masterchefABI, calls)
    const parsedEarnings = rawEarnings.map((earnings) => {
        return new BigNumber(earnings).toJSON()
    })
    return parsedEarnings
}