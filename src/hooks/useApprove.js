import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { approve } from './callHelper'
import { useERC20 } from './useContract'
import { approve } from '../utils/callHelpers'

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