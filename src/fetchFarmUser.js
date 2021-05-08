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

    const rawLpAllowances = await multicall(web3, erc20ABI, calls, chainId)
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

    const rawTokenBalances = await multicall(web3, erc20ABI, calls, chainId)
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

    const rawStakedBalances = await multicall(web3, masterchefABI, calls, chainId)
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
            name: 'pendingLqdr',
            params: [farm.pid, account],
        }
    })

    const rawEarnings = await multicall(web3, masterchefABI, calls, chainId)
    const parsedEarnings = rawEarnings.map((earnings) => {
        return new BigNumber(earnings).toJSON()
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


// export const useTotalValue = () => {
//     const farms = useFarms();
//     const bnbPrice = usePriceBnbBusd();
//     const cakePrice = usePriceCakeBusd();
//     let value = new BigNumber(0);
//     for (let i = 0; i < farms.length; i++) {
//         const farm = farms[i]
//         if (farm.lpTotalInQuoteToken) {
//             let val;
//             if (farm.quoteTokenSymbol === QuoteToken.BNB) {
//                 val = (bnbPrice.times(farm.lpTotalInQuoteToken));
//             } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
//                 val = (cakePrice.times(farm.lpTotalInQuoteToken));
//             } else {
//                 val = (farm.lpTotalInQuoteToken);
//             }
//             value = value.plus(val);
//         }
//     }
//     return value;
// }