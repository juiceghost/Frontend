import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {useLotteryInfo, useLotteryCurrentRoundNo} from '../../hooks/useLotteryData';

const WinnerInfo = () => {
    const [disabled, setDisabled] = useState(true);
    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();
    const curLotteryInfo = useLotteryInfo(lotteryCurrentRoundNo);
    const prevLotteryInfo = useLotteryInfo(lotteryCurrentRoundNo - 1);
    const [lotteryInfo, setLotteryInfo] = useState(null);

    useEffect(() => {
        if(!curLotteryInfo || !prevLotteryInfo) return
        const currentTimestamp = moment().unix()

        if(currentTimestamp < curLotteryInfo.closingTimestamp && currentTimestamp > curLotteryInfo.startingTimestamp) {
            setLotteryInfo(prevLotteryInfo)
            setDisabled(false)
        } else {
            setLotteryInfo(curLotteryInfo)
            setDisabled(true)
        }
    }, [curLotteryInfo, prevLotteryInfo, setLotteryInfo, setDisabled])

    return (
    <div className="winnerinfo-card">
        <p className="h-title">{disabled ? "Winning Numbers In This Round" : "Latest Winning Numbers"}</p>
        <div className="winning-pad">
            <div className="winning-number">{lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winningNumbers[0] : 0}</div>
            <div className="winning-number">{lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winningNumbers[1] : 0}</div>
            <div className="winning-number">{lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winningNumbers[2] : 0}</div>
            <div className="winning-number">{lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winningNumbers[3] : 0}</div>
        </div>
        <div className="winning-pad-info">
            <span>Tickets matching 4 numbers: {lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winnerCounts[3] : 0}</span><br/>
            <span>Tickets matching 3 numbers: {lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winnerCounts[2] : 0}</span><br/>
            <span>Tickets matching 2 numbers: {lotteryInfo && lotteryInfo.lotteryStatus === 3 ? lotteryInfo.winnerCounts[1] : 0}</span>
        </div>
    </div>);
}

export default WinnerInfo;