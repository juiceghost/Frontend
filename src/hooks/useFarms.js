import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { fetchFarms } from "../utils/api";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";

export const useFarms = (forceUpdate) => {
    const [farms, setFarms] = useState(null)

    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const getPools = async () => {
            try {
                const farms = await fetchFarms(web3, chainId)
                setFarms(farms)
                // console.info('Farms fetched:', farms)
            } catch (e) {
                console.error("Farms fetched had error", e)
            }
        }
        if (web3) {
            getPools()
        }
    }, [web3, chainId, fastRefresh, forceUpdate])

    return farms
}
