import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import BigNumber from "bignumber.js";
import { useERC20, useMasterChef } from './useContract'
import { getFullDisplayBalance } from '../utils/formatNumber';

// import useRefresh from './useRefresh';

const useFarmUser = (farm, forceUpdate) => {
    const [lpBalance, setLpBalance] = useState(0)
    const [stakedBalance, setStakedBalance] = useState(0)
    const [earnings, setEarnings] = useState(0)
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const lpAddress = farm?.lpAddresses[chainId]
    const lpContract = useERC20(lpAddress)
    const masterChefContract = useMasterChef()

    // const { fastRefresh } = useRefresh()

    useEffect(() => {

        const fetchLpBalance = async () => {
            let amount = await lpContract.methods.balanceOf(account).call()
            setLpBalance(getFullDisplayBalance(new BigNumber(amount)))
        }

        const fetchStakedBalance = async () => {
            console.log(farm.pid, account);
            let amount = await masterChefContract.methods.userInfo(farm.pid, account).call()
            setStakedBalance(getFullDisplayBalance(new BigNumber(amount[0])))
        }

        const fetchEarnings = async () => {
            let amount = await masterChefContract.methods.pendingLqdr(farm.pid, account).call()
            setEarnings(getFullDisplayBalance(new BigNumber(amount)))
        }

        if (account) {
            lpAddress && fetchLpBalance()
            masterChefContract && fetchStakedBalance()
            masterChefContract && fetchEarnings()
        } else {
            setEarnings("")
            setLpBalance("")
            setStakedBalance("")
        }
    }, [account, lpContract, masterChefContract, farm.pid, web3, chainId, forceUpdate])

    return { lpBalance, stakedBalance, earnings }
}


export default useFarmUser