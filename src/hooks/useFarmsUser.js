import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { fetchFarmUserDataAsync } from "../utils/fetchFarmUser";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";

export const useFarmsUser = (forceUpdate) => {
    const [users, setUsers] = useState(null)
    const web3 = useWeb3()
    const { chainId, account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchFarmUserDataAsync(web3, account, chainId)
                // console.log(data);
                setUsers(data)
                // console.info('getUserData fetched:', data)
            } catch (e) {
                console.error("getUserData fetched had error", e)
            }
        }
        if (web3 && account) {
            getUserData()
        }
    }, [account, chainId, web3, fastRefresh, forceUpdate])

    return users
}
