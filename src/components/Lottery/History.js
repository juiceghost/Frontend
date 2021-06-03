import React, { useState } from 'react';
import LotteryChart from './LotteryChart';
import SelectBox from './SelectBox';

const History = () => {
    const [currRow, setCurrRow] = useState(100)

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
        <LotteryChart />
    </div>);
}

export default History;