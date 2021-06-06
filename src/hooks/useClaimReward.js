import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLottery } from './useContract'
import { claimReward } from '../utils/callHelpers'

export const useClaimReward = (lotteryId) => {
    const { account } = useWeb3React()
    const lotteryContract = useLottery()

    const handleClaimReward = useCallback(async(ticketIds) => {
        try {
            const tx = await claimReward(
                lotteryContract,
                lotteryId,
                ticketIds,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, lotteryContract, lotteryId])

    return { onClaimReward: handleClaimReward }
}