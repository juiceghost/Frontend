import React, { useState } from 'react';
import { observer } from 'mobx-react'
import ConnectWallet from '../components/ConnetWallet';
import { useWeb3React } from '@web3-react/core';

import './lottery.scss'

const Lottery = () => {
    // const [lotteryNumber, setLotteryNumber] = useState(1)
    const { account } = useWeb3React()

    const [inputNumber, setInputNumber] = useState(1)
    return (<>
        <div className="lottery-wrap">
            <p className="main-title">The LQDR Lottery</p>
            <p className="ticket">Buy tickets with LQDR <br />
            Win if 2, 3, or 4 of your ticket numbers match!</p>

            <div className="timer-wrap">
                <div className="timer">

                </div>
            </div>

            <div className="timer-text">
                <span className="bold">3h:2m</span>
                <span> Until lottery draw</span>
            </div>

            <div className="draw-btns">
                <div className="lq-button  navy-button">
                    Next Draw

                </div>
                <div className="lq-button  blue-button">
                    Past Draws
                </div>
            </div>


            <div className="lottery-info">

                <div className="winner">
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
                        <div className="clear-both"></div>


                        <div className="buy-ticket">
                            {account ? <div className="lq-button blue-button">Buy Ticket</div> : <ConnectWallet />}
                        </div>

                    </div>

                </div>

                <div className="history"></div>

            </div>

        </div>


    </>);
}

export default observer(Lottery);