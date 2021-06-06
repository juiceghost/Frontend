import React from 'react';

import {useLotteryInfo, useLotteryCurrentRoundNo} from '../../hooks/useLotteryData';

const WinnerInfo = () => {

    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();
    const lotteryInfo = useLotteryInfo(lotteryCurrentRoundNo);

    return (
    <div className="winnerinfo-card">
        <p className="h-title">Winning Numbers In This Round</p>
        <div className="winning-pad">
            <div className="winning-number">{lotteryInfo ? lotteryInfo.winningNumbers[0] : 0}</div>
            <div className="winning-number">{lotteryInfo ? lotteryInfo.winningNumbers[1] : 0}</div>
            <div className="winning-number">{lotteryInfo ? lotteryInfo.winningNumbers[2] : 0}</div>
            <div className="winning-number">{lotteryInfo ? lotteryInfo.winningNumbers[3] : 0}</div>
        </div>
        <div className="winning-pad-info">
            <span>Tickets matching 4 numbers: {lotteryInfo ? lotteryInfo.winnerCounts[3] : 0}</span><br/>
            <span>Tickets matching 3 numbers: {lotteryInfo ? lotteryInfo.winnerCounts[2] : 0}</span><br/>
            <span>Tickets matching 2 numbers: {lotteryInfo ? lotteryInfo.winnerCounts[1] : 0}</span>
        </div>
    </div>);
}

export default WinnerInfo;