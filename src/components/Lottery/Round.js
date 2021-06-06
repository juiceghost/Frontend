import React, { useState } from 'react';

const Round = () => {
    const [inputNumber, setInputNumber] = useState(1)

    return (<div className="winner">
        <div className="search-wrap">
            <p>Select lottery number:</p>
            <div className="input-wrap">
                <div className="input-box">
                    <input type="number" max="100" min="1" step="1" placeholder="5" value={inputNumber} onChange={(e) => setInputNumber(e.currentTarget.value)} />
                </div>
                <div className="search-btn">Search</div>
            </div>
        </div>

        <div className="round-wrap">
            <p className="round-title">Round #7</p>
            <div className="prize-wrap">
                <div className="win-numbers">
                    <p className="w-title">Winning Numbers</p>
                    <p className="w-numbers"> 2, 3, 9</p>
                </div>

                <div className="win-numbers">
                    <p className="w-title">Total Prizes </p>
                    <p className="w-numbers">55.46 LQDR</p>
                </div>


            </div>
        </div>

        <div className="result-wrap">
            <div className="matched">
                <p className="m-title" style={{ width: "200px", textAlign: "left" }}>No. Matched</p>
                <p className="m-title">Winners</p>
                <p className="m-title">Prize Pot</p>
                <p>4</p><p>0</p><p>27.73</p>
                <p>3</p><p>0</p><p>11.25</p>
                <p>2</p><p>0</p><p>7.13</p>
            </div>

            <div className="burned">
                <span className="b-title">Burned : </span>
                <span> 11.09</span>
            </div>
        </div>

    </div>);
}

export default Round;