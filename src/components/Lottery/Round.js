import React, { useState } from 'react';
import BigNumber from 'bignumber.js'
import { useWeb3React } from "@web3-react/core"
import useWeb3 from "../../hooks/useWeb3";
import {
    fetchLotteryInfo
} from '../../utils/fetchLotteryData'

const Round = () => {
    const [inputNumber, setInputNumber] = useState(1)
    const [lotteryInfo, setLotteryInfo] = useState(null)
    
    const web3 = useWeb3()
    const { chainId } = useWeb3React()

    const SearchHandler = async () => {
        const data = await fetchLotteryInfo(web3, chainId, inputNumber)
        console.log(data)
        setLotteryInfo(data)
    }

    return (<div className="winner">
        <div className="search-wrap">
            <p>Select lottery number:</p>
            <div className="input-wrap">
                <div className="input-box">
                    <input type="number" max="100" min="1" step="1" placeholder="5" value={inputNumber} onChange={(e) => setInputNumber(e.currentTarget.value)} />
                </div>
                <div className="search-btn" onClick={() => SearchHandler()}>Search</div>
            </div>
        </div>

        <div className="round-wrap">
            <p className="round-title">Round #{lotteryInfo ? lotteryInfo.lotteryID : ''}</p>
            <div className="prize-wrap">
                <div className="win-numbers">
                    <p className="w-title">Winning Numbers</p>
                    <p className="w-numbers">{lotteryInfo ? lotteryInfo.winningNumbers.join(' , ') : ''}</p>
                </div>

                <div className="win-numbers">
                    <p className="w-title">Total Prizes </p>
                    <p className="w-numbers">{lotteryInfo ? new BigNumber(lotteryInfo.prizePoolInLqdr).div(10 ** 18).toFormat(2) : ''} LQDR</p>
                </div>


            </div>
        </div>

        <div className="result-wrap">
            <div className="matched">
                <p className="m-title" style={{ width: "200px", textAlign: "left" }}>No. Matched</p>
                <p className="m-title">Winners</p>
                <p className="m-title">Prize Pot</p>
                <p>4</p><p>{lotteryInfo ? lotteryInfo.winnerCounts[3] : 0}</p><p>{lotteryInfo && lotteryInfo.prizeDistribution[3] > 0 ? new BigNumber(lotteryInfo.prizePoolInLqdr).div(10 ** 18).times(lotteryInfo.prizeDistribution[3]).div(100).toFormat(2) : 0}</p>
                <p>3</p><p>{lotteryInfo ? lotteryInfo.winnerCounts[2] : 0}</p><p>{lotteryInfo && lotteryInfo.prizeDistribution[2] > 0 ? new BigNumber(lotteryInfo.prizePoolInLqdr).div(10 ** 18).times(lotteryInfo.prizeDistribution[2]).div(100).toFormat(2) : 0}</p>
                <p>2</p><p>{lotteryInfo ? lotteryInfo.winnerCounts[1] : 0}</p><p>{lotteryInfo && lotteryInfo.prizeDistribution[1] > 0 ? new BigNumber(lotteryInfo.prizePoolInLqdr).div(10 ** 18).times(lotteryInfo.prizeDistribution[1]).div(100).toFormat(2) : 0}</p>
            </div>

            <div className="burned">
                <span className="b-title">Burned : </span>
                <span>{lotteryInfo && lotteryInfo.prizeDistribution[0] > 0 ? new BigNumber(lotteryInfo.prizePoolInLqdr).div(10 ** 18).times(lotteryInfo.prizeDistribution[0]).div(100).toFormat(2) : 0}</span>
            </div>
        </div>

    </div>);
}

export default Round;