import BigNumber from 'bignumber.js'
import erc20ABI from '../config/abi/erc20.json'
import lotteryABI from '../config/abi/lottery.json'
import lotteryNftABI from '../config/abi/lotteryNFT.json'
import multicall from './multicall'
import { getLotteryAddress, getLqdrAddress, getLotteryNftAddress } from './addressHelpers'

export const fetchLotteryAllowances = async(web3, account, chainId) => {
    const lqdrAddress = getLqdrAddress(chainId)
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lqdrAddress,
        name: 'allowance',
        params: [account, lotteryAdress]
    }]

    const [allowance] = await multicall(web3, erc20ABI, calls, chainId)
    return new BigNumber(allowance)
}

export const fetchLotteryCurrentRoundNo = async(web3, chainId) => {
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lotteryAdress,
        name: 'getCurrentLotteryId',
        params: []
    }]

    const [currentRoundNo] = await multicall(web3, lotteryABI, calls, chainId)
    return Number(currentRoundNo)
}

export const fetchLotteryInfo = async(web3, chainId, roundNo) => {
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lotteryAdress,
        name: 'getBasicLottoInfo',
        params: [roundNo]
    }]

    const [lotteryInfo] = await multicall(web3, lotteryABI, calls, chainId)
    return {
        lotteryID: Number(lotteryInfo[0].lotteryID),
        lotteryStatus: Number(lotteryInfo[0].lotteryStatus),
        prizePoolInLqdr: Number(lotteryInfo[0].prizePoolInLqdr),
        costPerTicket: Number(lotteryInfo[0].costPerTicket),
        prizeDistribution: lotteryInfo[0].prizeDistribution,
        startingTimestamp: Number(lotteryInfo[0].startingTimestamp),
        closingTimestamp: Number(lotteryInfo[0].closingTimestamp),
        winningNumbers: lotteryInfo[0].winningNumbers,
        winnerCounts: lotteryInfo[0].winnerCounts,
        startTicketID: Number(lotteryInfo[0].startTicketID),
        endTicketID: Number(lotteryInfo[0].endTicketID),
        claimedPrize: Number(lotteryInfo[0].claimedPrize)
    }
}

export const fetchLotteryCurrentPrize = async(web3, chainId, roundNo) => {
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lotteryAdress,
        name: 'getPrizeForCurrentLottery',
        params: [roundNo]
    }]

    const [lotteryCurrentPrize] = await multicall(web3, lotteryABI, calls, chainId)
    return new BigNumber(lotteryCurrentPrize)
}

export const fetchLotterySize = async(web3, chainId) => {
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lotteryAdress,
        name: 'sizeOfLottery_',
        params: []
    }]

    const [lotterySize] = await multicall(web3, lotteryABI, calls, chainId)
    return Number(lotterySize)
}

export const fetchLotteryMaxRange = async(web3, chainId) => {
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lotteryAdress,
        name: 'getMaxRange',
        params: []
    }]

    const [lotteryMaxRange] = await multicall(web3, lotteryABI, calls, chainId)
    return Number(lotteryMaxRange)
}

export const fetchLotteryTicketData = async(web3, chainId, account, roundNo) => {
    const lotteryAdress = getLotteryAddress(chainId)
    const lotteryNftAdress = getLotteryNftAddress(chainId)

    const calls = [{
        address: lotteryNftAdress,
        name: 'getUserTickets',
        params: [roundNo, account]
    }]
    const [tickets] = await multicall(web3, lotteryNftABI, calls, chainId)

    const callsForTicketNumbers =  tickets[0].map((ticketNo) => {
        return {
            address: lotteryNftAdress,
            name: 'getTicketNumbers',
            params: [Number(ticketNo)]
        }
    })
    const ticketNumberDatas = await multicall(web3, lotteryNftABI, callsForTicketNumbers, chainId)
    
    const callsForReward =  tickets[0].map((ticketNo) => {
        return {
            address: lotteryAdress,
            name: 'getClaimableRewardForTicket',
            params: [roundNo, Number(ticketNo)]
        }
    })
    const ticketRewardData = await multicall(web3, lotteryABI, callsForReward, chainId)
    
    const callsForTicketClaimStatus =  tickets[0].map((ticketNo) => {
        return {
            address: lotteryNftAdress,
            name: 'getTicketClaimStatus',
            params: [Number(ticketNo)]
        }
    })
    const ticketClaimStatusData = await multicall(web3, lotteryNftABI, callsForTicketClaimStatus, chainId)

    const ticketData = tickets[0].map((ticketNo, i) => {
        return {            
            ticketNo: Number(ticketNo),
            ticketNumbers: ticketNumberDatas[i],
            ticketReward: new BigNumber(ticketRewardData[i]),
            ticketClaim: ticketClaimStatusData[i][0],
        }
    })

    return ticketData
}

export const fetchLotteryGraphData = async(web3, chainId, startLotteryNo, endLotteryNo) => {
    const lotteryAdress = getLotteryAddress(chainId)

    let calls = []
    for (let i = startLotteryNo; i <= endLotteryNo; i++) {
        calls.push({
            address: lotteryAdress,
            name: 'getBasicLottoInfo',
            params: [i]
        })
    }

    const lotteryInfo = await multicall(web3, lotteryABI, calls, chainId)
    let idList = []
    let poolData = []
    let burnedData = []
    lotteryInfo.map((lotteryData) => {
        idList.push(Number(lotteryData[0].lotteryID))
        poolData.push(new BigNumber(Number(lotteryData[0].prizePoolInLqdr)).div(10 ** 18).toFixed(2))
        burnedData.push(new BigNumber(Number(lotteryData[0].prizePoolInLqdr)).div(10 ** 18).times(lotteryData[0].prizeDistribution[0]).div(100).toFixed(2))
        return 0;
    })

    return {
        idList, poolData, burnedData
    };
}

export const fetchCostWithDiscount = async(web3, chainId, roundNo, numberOfTickets) => {
    const lotteryAdress = getLotteryAddress(chainId)

    const calls = [{
        address: lotteryAdress,
        name: 'costToBuyTicketsWithDiscount',
        params: [roundNo, numberOfTickets]
    }]

    const [res] = await multicall(web3, lotteryABI, calls, chainId)
    const { 2: costWithDiscount } = res
    return Number(costWithDiscount)
}