import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import BigNumber from "bignumber.js";
// import useRefresh from "../hooks/useRefresh";
import { useERC20 } from './useContract'
import { ethers } from "ethers";
// import { ZERO } from "../config/constants/numbers";


export const useAllowance = (farm, contractAddress, forceUpdate) => {
    const [allowance, setAllowance] = useState(new BigNumber(-1))
    const { account, chainId } = useWeb3React()
    // const { fastRefresh } = useRefresh()
    const fastRefresh = 1
    const lpAddress = farm?.lpAddresses[chainId]
    const contract = useERC20(lpAddress)

    useEffect(() => {
        const fetchAllowance = async () => {
            if (contract === null) setAllowance(new BigNumber(-1))
            else {
                const res = await contract.methods.allowance(account, contractAddress).call()
                setAllowance(new BigNumber(res))
            }
        }
        if (account && lpAddress) {
            fetchAllowance()
        }
    }, [account, contract, chainId, contractAddress, lpAddress, fastRefresh, forceUpdate])

    return allowance
}