import BigNumber from "bignumber.js";
import { TEN } from "../config/constants/numbers";

export const toWei = (number, decimals = 18) => (new BigNumber(number).times(TEN.pow(decimals)))

export const fromWei = (number, decimals = 18) => (new BigNumber(number).dividedBy(TEN.pow(decimals)))

export const getBalanceNumber = (balance, decimals = 18) => {
    return fromWei(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
    return fromWei(balance, decimals).toFixed()
}