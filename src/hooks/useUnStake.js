import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { approve } from './callHelper'
import { useMasterChef } from './useContract'
import { unstake } from '../utils/callHelpers'

export const useUnStake = (farm, amount) => {
    const { account } = useWeb3React()
    const masterChefContract = useMasterChef()

    const handleUnStake = useCallback(async () => {
        try {
            const tx = await unstake(
                masterChefContract,
                farm.pid,
                amount,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, amount, farm, masterChefContract])

    return { onUnStake: handleUnStake }
}