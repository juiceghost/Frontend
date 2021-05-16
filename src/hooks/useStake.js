import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useMasterChef } from './useContract'
import { stake } from '../utils/callHelpers'

export const useStake = (farm, amount) => {
    const { account } = useWeb3React()
    const masterChefContract = useMasterChef()

    const handleStake = useCallback(async () => {
        try {
            const tx = await stake(
                masterChefContract,
                farm.pid,
                amount,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, amount, masterChefContract, farm])

    return { onStake: handleStake }
}