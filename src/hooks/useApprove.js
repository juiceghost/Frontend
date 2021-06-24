import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { approve } from './callHelper'
import { useERC20 } from './useContract'
import { approve } from '../utils/callHelpers'
import { getLqdrAddress, getLotteryAddress, getXLqdrAddress } from '../utils/addressHelpers'

export const useApprove = (farm, contractAddress) => {
    const { account, chainId } = useWeb3React()
    const lpAddress = farm?.lpAddresses[chainId]
    const contract = useERC20(lpAddress)

    const handleApprove = useCallback(async () => {
        try {
            const tx = await approve(
                contract,
                contractAddress,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, contract, contractAddress])

    return { onApprove: handleApprove }
}

export const useLotteryApprove = () => {
    const { account, chainId } = useWeb3React()
    const lqdrContract = useERC20(getLqdrAddress(chainId))
    const lotteryAddress = getLotteryAddress(chainId)

    const handleApprove = useCallback(async () => {
        try {
            const tx = await approve(
                lqdrContract,
                lotteryAddress,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, lqdrContract, lotteryAddress])

    return { onApprove: handleApprove }
}

export const useXlqdrApprove = () => {
    const { account, chainId } = useWeb3React()
    const lqdrContract = useERC20(getLqdrAddress(chainId))
    const xlqdrAddress = getXLqdrAddress(chainId)

    const handleApprove = useCallback(async () => {
        try {
            const tx = await approve(
                lqdrContract,
                xlqdrAddress,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, lqdrContract, xlqdrAddress])

    return { onApprove: handleApprove }
}