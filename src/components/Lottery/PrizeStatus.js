import React, {useState, useEffect, useCallback} from 'react';
import ConnectWallet from '../Common/ConnetWallet';
import { useWeb3React } from '@web3-react/core';
import {
    useLotteryInfo, 
    useLotteryCurrentRoundNo,
    useLotteryMetaData,
    useAllowance
} from '../../hooks/useLotteryData';
import {useLotteryApprove} from '../../hooks/useApprove'
import useTokenBalance from '../../hooks/useTokenBalance';
import { getLqdrAddress } from '../../utils/addressHelpers'

import BuyTicketModal from './BuyTicketModal';
import moment from 'moment';


const PrizeStatus = () => {
    const { account, chainId } = useWeb3React()
    const [disabled, setDisabled] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    const allowance = useAllowance();
    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();
    const lotteryInfo = useLotteryInfo(lotteryCurrentRoundNo);
    const lotteryMetaData = useLotteryMetaData(lotteryCurrentRoundNo);
    const lqdrBalance = useTokenBalance(getLqdrAddress(chainId))

    const {onApprove} = useLotteryApprove()

    useEffect(() => {
        if(!lotteryInfo) return
        const currentTimestamp = moment().unix()

        if(currentTimestamp < lotteryInfo.closingTimestamp && currentTimestamp > lotteryInfo.startingTimestamp) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [lotteryInfo])

    const handleBuy = useCallback(() => {
        if (!disabled) setIsOpen(true)
    }, [disabled])

    return (<div className="winner">

        <div className="result-wrap">

            <div className="total-pot">
                <div className="logo-image">
                    <img src="img/logo.png" width="64px" alt=""/>
                </div>
                <div>
                    <span className="title">Total Pot</span><br/>
                    <span className="amount">{lotteryMetaData ? lotteryMetaData.lotteryCurrentPrize.div(10 ** 18).toFormat(2) : 0.00} LQDR</span>
                </div>
            </div>

            <div className="matched-prizestatus">
                <p className="m-title" style={{ width: "200px", textAlign: "left" }}>No. Matched</p>
                <p className="m-title">Prize Pot</p>
                <p>4</p><p>{lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[3] > 0 ? lotteryMetaData.lotteryCurrentPrize.div(10 ** 18).times(lotteryInfo.prizeDistribution[3]).div(100).toFormat(2) : 0}</p>
                <p>3</p><p>{lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[3] > 0 ? lotteryMetaData.lotteryCurrentPrize.div(10 ** 18).times(lotteryInfo.prizeDistribution[2]).div(100).toFormat(2) : 0}</p>
                <p>2</p><p>{lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[3] > 0 ? lotteryMetaData.lotteryCurrentPrize.div(10 ** 18).times(lotteryInfo.prizeDistribution[1]).div(100).toFormat(2) : 0}</p>
                <p>To burn</p><p>{lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[3] > 0 ? lotteryMetaData.lotteryCurrentPrize.div(10 ** 18).times(lotteryInfo.prizeDistribution[0]).div(100).toFormat(2) : 0}</p>
            </div>

                <div className="buy-ticket">
                    {account ? allowance.gt(0) ?
                        <div className={`lq-button ${disabled ? "grey-button" : "blue-button" }`} onClick={handleBuy}>Buy Ticket</div> : 
                        <div className="lq-button blue-button" onClick={() => onApprove()}>Approve</div> : 
                        <ConnectWallet />
                    }
                </div>

        </div>

        <BuyTicketModal 
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                lotteryId = {lotteryCurrentRoundNo}
                lotterySize = {lotteryMetaData ? lotteryMetaData.lotterySize : 4}
                maxRange = {lotteryMetaData ? lotteryMetaData.lotteryMaxRange : 14}
                ticketPrice = {lotteryInfo ? Number(lotteryInfo.costPerTicket) / 1e18 : 0}
                lqdrBalance = {lqdrBalance} />

    </div>);
}

export default PrizeStatus;