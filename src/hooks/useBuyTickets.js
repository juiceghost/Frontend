import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLottery } from './useContract'
import { buyTickets } from '../utils/callHelpers'
import { generateLottoNumbers } from '../utils'

export const useBuyTickets = (lotteryId, lotterySize, maxRange) => {
    const { account } = useWeb3React()
    const lotteryContract = useLottery()

    const handleBuyTicket = useCallback(async(ticketAmount) => {
        try {
            const ticketNumbers = generateLottoNumbers(ticketAmount, lotterySize, maxRange)
            const tx = await buyTickets(
                lotteryContract,
                lotteryId,
                ticketAmount,
                ticketNumbers,
                account
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, lotteryContract, lotteryId, lotterySize, maxRange])

    return { onBuyTickets: handleBuyTicket }
}