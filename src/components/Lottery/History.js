import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useWeb3 from "../../hooks/useWeb3";
import {
    useLotteryCurrentRoundNo
} from '../../hooks/useLotteryData';
import {fetchLotteryGraphData} from '../../utils/fetchLotteryData';
import LotteryChart from './LotteryChart';
import SelectBox from './SelectBox';

const History = () => {
    const { chainId } = useWeb3React()
    const web3 = useWeb3()

    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();

    const [currRow, setCurrRow] = useState(100)
    const [idList, setIdList] = useState(['1'])
    const [poolData, setPoolData] = useState([0])
    const [burnedData, setBurnedData] = useState([0])

    useEffect(() => {
        async function getGraphData (startLotteryNo, endLotteryNo) {
            const graphData = await fetchLotteryGraphData(web3, chainId, startLotteryNo, endLotteryNo)
            if(graphData) {
                setIdList(graphData.idList)
                setPoolData(graphData.poolData)
                setBurnedData(graphData.burnedData)
            }
        }
        console.log('')
        getGraphData(lotteryCurrentRoundNo > currRow ? lotteryCurrentRoundNo - currRow + 1 : 1, lotteryCurrentRoundNo);        
    }, [web3, chainId, currRow, lotteryCurrentRoundNo])
    
    return (<div className="history">
        <p className="h-title">History</p>
        <div className="label-chart">
            <div className="h-left">
                <div className="pool">
                    <div className="color"></div>
                    <p> Pool Size</p>
                </div>
                <div className="burned">
                    <div className="color"></div>
                    <p> Burned</p>
                </div>
            </div>
            <div className="h-right">
                <div className="show-last">Show last</div>
                <SelectBox currRow={currRow} setCurrRow={setCurrRow} />
            </div>

        </div>
        <LotteryChart idList={idList} poolData = {poolData} burnedData = {burnedData}/>
    </div>);
}

export default History;