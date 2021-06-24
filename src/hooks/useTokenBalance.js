import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import { isAddress } from "@ethersproject/address"
import BigNumber from "bignumber.js";
import { useERC20 } from './useContract'

import useRefresh from './useRefresh';

const useTokenBalance = (tokenAddress, fastUpdate = null) => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const contract = useERC20(tokenAddress)
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const fetchBalance = async () => {
            if (!isAddress(tokenAddress)) {
                const walletBalance = await web3.eth.getBalance(account)
                setBalance(new BigNumber(walletBalance).div(1e18))
            } else {
                const [walletBalance, decimals] = await Promise.all([
                    contract.methods.balanceOf(account).call(),
                    contract.methods.decimals().call(),
                ])
                setBalance(new BigNumber(walletBalance).div(10 ** Number(decimals)))
            }
        }

        if (account) {
            fetchBalance()
        } else {
            setBalance(new BigNumber(0))
        }
    }, [account, tokenAddress, web3, contract, fastRefresh])

    return balance
}


export default useTokenBalance