import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import BigNumber from 'bignumber.js'
import { 
    fetchLotteryCurrentRoundNo,
    fetchLotteryInfo, 
    fetchLotteryCurrentPrize,
    fetchLotterySize,
    fetchLotteryMaxRange,
    fetchLotteryTicketData
 } from "../utils/fetchLotteryData";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";
import {useERC20} from '../hooks/useContract'
import { getLqdrAddress, getLotteryAddress } from '../utils/addressHelpers'


export const useAllowance = () => {
    const [allowance, setAllowance] = useState(new BigNumber(0))
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const lqdrContract = useERC20(getLqdrAddress(chainId))
    const lotteryAddress = getLotteryAddress(chainId)

    useEffect(() => {
        const fetchAllowance = async () => {
            const res = await lqdrContract.methods.allowance(account, lotteryAddress).call()
            setAllowance(new BigNumber(res))
        }
        if (account && lqdrContract && lotteryAddress) {
            fetchAllowance()
        }
    }, [account, lqdrContract, lotteryAddress, fastRefresh])

    return allowance
}

export const useLotteryCurrentRoundNo = () => {
    const [lotteryCurrentRoundNo, setLotteryCurrentRoundNo] = useState(0)

    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const getLotteryCurrentRoundNo = async() => {
            try {
                const data = await fetchLotteryCurrentRoundNo(web3, chainId)
                setLotteryCurrentRoundNo(data)
            } catch (e) {
                console.error("fetch lottery current round no had error", e)
            }
        }
        if (web3) {
            getLotteryCurrentRoundNo()
        }
    }, [web3, chainId, fastRefresh])

    return lotteryCurrentRoundNo
}

export const useLotteryInfo = (roundNo) => {
    const [lotteryInfo, setLotteryInfo] = useState(null)

    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const getLotteryInfo = async() => {
            try {
                const data = await fetchLotteryInfo(web3, chainId, roundNo)
                setLotteryInfo(data)
            } catch (e) {
                console.error("fetch lottery info had error", e)
            }
        }
        if (web3 && roundNo > 0) {
            getLotteryInfo()
        }
    }, [web3, chainId, fastRefresh, roundNo])

    return lotteryInfo
}

export const useLotteryMetaData = (roundNo) => {
    const [lotteryMetaData, setLotteryMetaData] = useState(null)

    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const getLotteryMetaData = async() => {
            try {
                const lotteryCurrentPrize = await fetchLotteryCurrentPrize(web3, chainId, roundNo)
                const lotterySize = await fetchLotterySize(web3, chainId)
                const lotteryMaxRange = await fetchLotteryMaxRange(web3, chainId)
                setLotteryMetaData({lotteryCurrentPrize, lotterySize, lotteryMaxRange})
            } catch (e) {
                console.error("fetch lottery meta data had error", e)
            }
        }
        if (web3 && roundNo) {
            getLotteryMetaData()
        }
    }, [web3, chainId, fastRefresh, roundNo])

    return lotteryMetaData
}

export const useLotteryTicketData = (roundNo) => {
    const [lotteryTicketData, setLotteryTicketData] = useState(null)

    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const getLotteryTicketData = async() => {
            try {
                const ticketData = await fetchLotteryTicketData(web3, chainId, account, roundNo)
                setLotteryTicketData(ticketData)
            } catch (e) {
                console.error("fetch lottery ticket data had error", e)
            }
        }
        if (web3 && account && roundNo) {
            getLotteryTicketData()
        }
    }, [web3, account, chainId, fastRefresh, roundNo])

    return lotteryTicketData
}