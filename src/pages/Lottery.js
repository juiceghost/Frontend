import React, { useState } from 'react';
import { observer } from 'mobx-react'
import BuyTicketModal from '../components/Lottery/BuyTicketModal';
import History from '../components/Lottery/History';
import Round from '../components/Lottery/Round';
import './lottery.scss'

const Lottery = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

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
                <Round setIsOpen={setIsOpen} />
                <History />
            </div>

            <BuyTicketModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

        </div>


    </>);
}

export default observer(Lottery);