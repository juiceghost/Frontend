import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { fechLqdr } from "../utils/api";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";

export const useLqdr = (forceUpdate) => {
    const [lqdrs, setLqdrs] = useState(null)

    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const getLqdr = async () => {
            try {
                const data = await fechLqdr(web3, chainId)
                setLqdrs(data)
                // console.info('getLqdr :', data)
            } catch (e) {
                console.error("Farms fetched had error", e)
            }
        }
        if (web3) {
            getLqdr()
        }
    }, [web3, chainId, fastRefresh, forceUpdate])

    return lqdrs
}
