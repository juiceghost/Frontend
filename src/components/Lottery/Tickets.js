import React, {useState, useEffect} from 'react';
import ConnectWallet from '../Common/ConnetWallet';
import { useWeb3React } from '@web3-react/core';
import useWeb3 from "../../hooks/useWeb3";
import {useClaimReward} from '../../hooks/useClaimReward';
import {
    useLotteryCurrentRoundNo,
    useLotteryTicketData
} from '../../hooks/useLotteryData';

import {
    fetchLotteryTicketData
} from '../../utils/fetchLotteryData';

import BigNumber from 'bignumber.js';

const Tickets = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();
    const lotteryTicketData = useLotteryTicketData(lotteryCurrentRoundNo);
    const [rewardSum, setRewardSum] = useState(new BigNumber(1))
    const [rewardTicketIds, setRewardTicketIds] = useState([])

    const [inputNumber, setInputNumber] = useState(lotteryCurrentRoundNo)
    const [lotteryTicketDataBySearch, setLotteryTicketData] = useState(null)

    

    const {onClaimReward} = useClaimReward(lotteryCurrentRoundNo)

    useEffect(() => {
        setInputNumber(lotteryCurrentRoundNo)
    }, [lotteryCurrentRoundNo])

    useEffect(() => {
        const data = lotteryTicketDataBySearch === null ? lotteryTicketData : lotteryTicketDataBySearch
        if(data) {
            let tempRewardSum = new BigNumber(0)
            let tempRewardTicketIds = []

            for(let i=0; i<data.length; i++) {
                tempRewardSum = tempRewardSum.plus(data[i].ticketReward)
                if(data[i].ticketReward.gt(0) && !data[i].ticketClaim)
                    tempRewardTicketIds.push(data[i].ticketNo)
            }

            if(!rewardSum.eq(tempRewardSum))
                setRewardSum(tempRewardSum);
            
            if(rewardTicketIds.length !== tempRewardTicketIds.length)
                setRewardTicketIds(tempRewardTicketIds);
        }
        
    }, [lotteryTicketData, lotteryTicketDataBySearch, rewardSum, rewardTicketIds])

    const handleClaimReward = () => {
        if(rewardTicketIds.length === 0)
            return
        onClaimReward(rewardTicketIds)
    }

    const SearchHandler = async () => {
        const data = await fetchLotteryTicketData(web3, chainId, account, inputNumber)
        setLotteryTicketData(data)
    }
    
    return (
    <div className="ticket-card">
        <div className="search-wrap">
            <p>Select lottery number:</p>
            <div className="input-wrap">
                <div className="input-box">
                    <input type="number" max="100" min="1" step="1" placeholder="5" value={inputNumber} onChange={(e) => setInputNumber(e.currentTarget.value)} />
                </div>
                <div className="search-btn" onClick={() => SearchHandler()}>Search</div>
            </div>
        </div>
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