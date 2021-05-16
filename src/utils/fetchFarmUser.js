import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import erc20ABI from '../config/abi/erc20.json'
import masterchefABI from '../config/abi/masterchef.json'
import multicall from './multicall'
import { getMasterChefAddress } from './addressHelpers'
import farmsConfig from '../config/constants/farms'
import { ZERO } from '../config/constants/numbers'
import { useFarms } from '../hooks/useFarms'
import { usePrices } from '../hooks/usePrices'

export const fetchFarmUserAllowances = async (web3, account, chainId) => {
    const masterChefAdress = getMasterChefAddress(chainId)

    const calls = farmsConfig.map((farm) => {
        const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[chainId] : farm.lpAddresses[chainId]
        return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
    })

    const rawLpAllowances = await multicall(web3, erc20ABI, calls, chainId)
    const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
        return new BigNumber(lpBalance).toFixed(0, BigNumber.ROUND_DOWN)
    })
    return parsedLpAllowances
}

//Todo
export const fetchFarmUserTokenBalances = async (web3, account, chainId) => {
    const calls = farmsConfig.map((farm) => {
        const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[chainId] : farm.lpAddresses[chainId]
        return {
            address: lpContractAddress,
            name: 'balanceOf',
            params: [account],
        }
    })

    const rawTokenBalances = await multicall(web3, erc20ABI, calls, chainId)
    const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
        return new BigNumber(tokenBalance).toFixed(0, BigNumber.ROUND_DOWN)
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

    const rawStakedBalances = await multicall(web3, masterchefABI, calls, chainId)
    const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
        return new BigNumber(stakedBalance[0]._hex).toFixed(0, BigNumber.ROUND_DOWN)
    })
    return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (web3, account, chainId) => {
    const masterChefAdress = getMasterChefAddress(chainId)

    const calls = farmsConfig.map((farm) => {
        return {
            address: masterChefAdress,
            name: 'pendingLqdr',
            params: [farm.pid, account],
        }
    })

    const rawEarnings = await multicall(web3, masterchefABI, calls, chainId)
    const parsedEarnings = rawEarnings.map((earnings) => {
        return new BigNumber(earnings).toFixed(0, BigNumber.ROUND_DOWN)
    })
    return parsedEarnings
}


export const fetchFarmUserDataAsync = async (web3, account, chainId) => {
    const userFarmAllowances = await fetchFarmUserAllowances(web3, account, chainId)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(web3, account, chainId)
    const userStakedBalances = await fetchFarmUserStakedBalances(web3, account, chainId)
    const userFarmEarnings = await fetchFarmUserEarnings(web3, account, chainId)

    const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
        return {
            index,
            allowance: userFarmAllowances[index],
            tokenBalance: userFarmTokenBalances[index],
            stakedBalance: userStakedBalances[index],
            earnings: userFarmEarnings[index],
        }
    })
    return arrayOfUserDataObjects
}


export const useTotalValue = () => {
    const [TVL, setTVL] = useState(ZERO)
    const farms = useFarms();
    const prices = usePrices()

    useEffect(() => {
        const getTVL = () => {
            let value = ZERO;
            for (let i = 0; i < farms.length; i++) {
                const farm = farms[i]
                if (farm.lpTotalInQuoteToken) {
                    let val = farm.lpTotalInQuoteToken.times(prices[farm.quoteTokenSymbol])
                    if (!isNaN(val))
                        value = value.plus(val);
                }
            }
            return value
        }


        if (farms && prices) {
            setTVL(getTVL())
        }

    }, [farms, prices])
    return TVL;
}