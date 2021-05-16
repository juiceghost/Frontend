import { useEffect, useState } from "react"
import { fetchQuoteTokenPrices } from "../utils/api";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";

export const usePrices = (forceUpdate) => {
    const [prices, setPrices] = useState(null)

    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const getPrice = async () => {
            try {
                const prices = await fetchQuoteTokenPrices(web3, 250)
                setPrices(prices)
                // console.info('fetchQuoteTokenPrices fetched:', prices)
            } catch (e) {
                console.error("fetchQuoteTokenPrices fetched had error", e)
            }
        }
        if (web3) {
            getPrice()
        }
    }, [web3, fastRefresh, forceUpdate])

    return prices
}
