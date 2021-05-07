import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getSushiAmountsOut } from '../utils/callHelpers'
import useWeb3 from './useWeb3'
import { isZero } from '../config/constants/numbers'
export const useGetAmountsOut = (fromCurrency, toCurrency, amountIn) => {
    const { chainId } = useWeb3React()
    const web3 = useWeb3()
    const getAmountsOut = useCallback(async () => {

        try {
            if (amountIn === "" || isZero(amountIn)) return 0
            const amount = await getSushiAmountsOut(
                fromCurrency,
                toCurrency,
                amountIn,
                web3,
                chainId
            )
            return amount
        } catch (e) {
            console.log(e);
            return false
        }
        // eslint-disable-next-line
    }, [chainId, fromCurrency, toCurrency, amountIn, web3])//React Hook useCallback has an unnecessary dependency: 'fastRefresh'

    return { getAmountsOut }
}