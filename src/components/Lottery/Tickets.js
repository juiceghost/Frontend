import React, {useState, useEffect} from 'react';
import ConnectWallet from '../Common/ConnetWallet';
import { useWeb3React } from '@web3-react/core';
import {useClaimReward} from '../../hooks/useClaimReward';
import {
    useLotteryCurrentRoundNo,
    useLotteryTicketData
} from '../../hooks/useLotteryData';
import BigNumber from 'bignumber.js';

const Tickets = () => {
    const { account } = useWeb3React()
    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();
    const lotteryTicketData = useLotteryTicketData(lotteryCurrentRoundNo);
    const [rewardSum, setRewardSum] = useState(new BigNumber(0))
    const [rewardTicketIds, setRewardTicketIds] = useState([])

    const {onClaimReward} = useClaimReward(lotteryCurrentRoundNo)

    useEffect(() => {
        if(lotteryTicketData) {
            let tempRewardSum = new BigNumber(0)
            let tempRewardTicketIds = []

            for(let i=0; i<lotteryTicketData.length; i++) {
                tempRewardSum = tempRewardSum.plus(lotteryTicketData[i].ticketReward)
                if(lotteryTicketData[i].ticketReward.gt(0) && !lotteryTicketData[i].ticketClaim)
                    tempRewardTicketIds.push(lotteryTicketData[i].ticketNo)
            }

            if(!rewardSum.eq(tempRewardSum))
                setRewardSum(tempRewardSum);
            
            if(rewardTicketIds.length !== tempRewardTicketIds.length)
                setRewardTicketIds(tempRewardTicketIds);
        }
        
    }, [lotteryTicketData, rewardSum, rewardTicketIds])

    const handleClaimReward = () => {
        if(rewardTicketIds.length === 0)
            return
        onClaimReward(rewardTicketIds)
    }
    
    return (
    <div className="ticket-card">
        <p className="h-title">Tickets {lotteryTicketData && lotteryTicketData.length > 0 ? `(${lotteryTicketData.length})` : ''}</p>
        {lotteryTicketData && lotteryTicketData.length > 0 ?
            <div className="ticket-numbers">
                <p className="m-title" style={{ width: "200px", textAlign: "left" }}>Ticket Numbers</p>
                <p className="m-title">Rewards</p>
                <p className="m-title">Claimed</p>
                {lotteryTicketData.map((ticket, i) =>
                    <>
                        <p>{ticket.ticketNumbers.join(' , ')}</p>
                        <p>{ticket.ticketReward.div(10 ** 18).toFormat(2)}</p>
                        <p>{ticket.ticketClaim ? 'Yes' : 'No'}</p>
                    </>
                )}
            </div> :
            <div className="ticket-numbers">
                <p style={{paddingTop: '20px'}}>You have no tickets.</p>
            </div>
        }
         <div className="claim-reward">
            {account ?
                <div className={rewardTicketIds.length > 0 ? `lq-button blue-button` : `lq-button grey-button`} onClick={() => handleClaimReward()}>{`Claim Reward (${rewardSum.div(10 ** 18).toFormat(2)})`}</div> : 
                <ConnectWallet />
            }
        </div>

    </div>);
}

export default Tickets;