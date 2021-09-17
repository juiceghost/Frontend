import BigNumber from "bignumber.js";
import { TEN, isZero, isGt } from "../config/constants/numbers";

// BigNumber.DEBUG = true

// BigNumber.config({ DECIMAL_PLACES: 30, ROUNDING_MODE: BigNumber.ROUND_DOWN })

BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80,
    ROUNDING_MODE: BigNumber.ROUND_DOWN
})


export const toWei = (number, decimals = 18) => (new BigNumber(number).times(TEN.pow(decimals)))

export const fromWei = (number, decimals = 18) => (new BigNumber(number).div(TEN.pow(decimals)))

export const getBalanceNumber = (balance, decimals = 18) => {
    return fromWei(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
    return fromWei(balance, decimals).toFixed()
}

export const formatAmount = (amount = null, fixed = 5) => {

    if (!amount) return '0'
    if (isZero(amount) || isGt(0.00001, amount)) return 0

    const bigAmount = new BigNumber(amount)
    if (new BigNumber(10).pow(fixed - 1).lte(bigAmount)) {
        return bigAmount.toFixed(0, BigNumber.ROUND_DOWN)
    }
    return bigAmount.toPrecision(fixed, BigNumber.ROUND_DOWN)
}