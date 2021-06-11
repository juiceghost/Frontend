import React, {useState, useEffect,useCallback} from 'react';
import ConnectWallet from '../Common/ConnetWallet';
import { useWeb3React } from '@web3-react/core';
import useWeb3 from "../../hooks/useWeb3";
import useRefresh from '../../hooks/useRefresh'
import {useClaimReward} from '../../hooks/useClaimReward';
import {
    useLotteryCurrentRoundNo
} from '../../hooks/useLotteryData';

import {
    fetchLotteryTicketData
} from '../../utils/fetchLotteryData';

import BigNumber from 'bignumber.js';

const Tickets = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo()
    const [rewardSum, setRewardSum] = useState(new BigNumber(0))
    const [rewardTicketIds, setRewardTicketIds] = useState([])

    const [inputNumber, setInputNumber] = useState(lotteryCurrentRoundNo)
    const [lotteryTicketData, setLotteryTicketData] = useState(null)    

    const {onClaimReward} = useClaimReward(inputNumber)

    const handleClaimReward = () => {
        if(rewardTicketIds.length === 0)
            return
        onClaimReward(rewardTicketIds)
    }

    const SearchHandler = useCallback(async () => {
        if (!inputNumber) {
            return
        }
        const data = await fetchLotteryTicketData(web3, chainId, account, inputNumber)
        setLotteryTicketData(data)
    }, [inputNumber, setLotteryTicketData, web3, chainId, account, fastRefresh])

    useEffect(() => {
        setInputNumber(lotteryCurrentRoundNo)
    }, [lotteryCurrentRoundNo])

    useEffect(() => {
        SearchHandler()
    }, [inputNumber, SearchHandler])

    useEffect(() => {
        if(lotteryTicketData && lotteryTicketData.length > 0) {
            let tempRewardSum = new BigNumber(0)
            let tempRewardTicketIds = []

            for(let i=0; i<lotteryTicketData.length; i++) {
                tempRewardSum = tempRewardSum.plus(lotteryTicketData[i].ticketReward)
                if(lotteryTicketData[i].ticketReward.gt(0) && !lotteryTicketData[i].ticketClaim)
                    tempRewardTicketIds.push(lotteryTicketData[i].ticketNo)
            }

            setRewardSum(tempRewardSum);
            setRewardTicketIds(tempRewardTicketIds);
        } else {
            setRewardSum(new BigNumber(0));
            setRewardTicketIds([]);
        }
        
    }, [lotteryTicketData])
    
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