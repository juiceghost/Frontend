import BigNumber from "bignumber.js";
import { TEN } from "../config/constants/numbers";

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