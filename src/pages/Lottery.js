import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {useLotteryInfo, useLotteryCurrentRoundNo} from '../hooks/useLotteryData';
import History from '../components/Lottery/History';
import Round from '../components/Lottery/Round';
import PrizeStatus from '../components/Lottery/PrizeStatus';
import Tickets from '../components/Lottery/Tickets';
import WinnerInfo from '../components/Lottery/WinnerInfo';
import {ProgressBar} from 'react-bootstrap';
import './lottery.scss'

const Lottery = () => {
    const [tag, setTag] = useState('next');
    const [progress, setProgress] = useState(0);
    const [timeAlarm, setTimeAlarm] = useState('');

    const lotteryCurrentRoundNo = useLotteryCurrentRoundNo();
    const lotteryInfo = useLotteryInfo(lotteryCurrentRoundNo);


    useEffect(() => {
        if(lotteryInfo) {
            const currentTimestamp = moment().unix()
            if(currentTimestamp >= lotteryInfo.closingTimestamp) {
                setProgress(0)
                if(lotteryInfo.lotteryStatus < 3)
                    setTimeAlarm('Winning numbers will be drawn soon.')
                else
                    setTimeAlarm("New lottery will start soon.")
            }
            else if(currentTimestamp < lotteryInfo.startingTimestamp) {
                const timeLeft = lotteryInfo.startingTimestamp - currentTimestamp
                setProgress(0)
                const hourLeft = Math.floor(timeLeft / 3600)
                const minuteLeft = Math.ceil((timeLeft - hourLeft * 3600) / 60)
                if(hourLeft === 0)
                    setTimeAlarm(`${minuteLeft}m Until buy ticket`)
                else
                    setTimeAlarm(`${hourLeft}h, ${minuteLeft}m Until buy ticket`)
            }
            else {
                const timeLenght = lotteryInfo.closingTimestamp - lotteryInfo.startingTimestamp
                const timeLeft = lotteryInfo.closingTimestamp - currentTimestamp
                setProgress(timeLeft / timeLenght * 100)
                const hourLeft = Math.floor(timeLeft / 3600)
                const minuteLeft = Math.ceil((timeLeft - hourLeft * 3600) / 60)
                if(hourLeft === 0)
                    setTimeAlarm(`${minuteLeft}m Until lottery draw`)
                else
                    setTimeAlarm(`${hourLeft}h, ${minuteLeft}m Until lottery draw`)
            }
        }
    }, [lotteryInfo])

    return (<>
        <div className="lottery-wrap">
            <p className="main-title">The LQDR Lottery</p>
            <p className="ticket">Buy tickets with LQDR <br />
            Win if 2, 3, or 4 of your ticket numbers match!</p>

            
            <div className="timer-wrap">
                <ProgressBar now={progress}/>
            </div>

            <div className="timer-text">
                <span className="bold">{timeAlarm}</span>
            </div>

            <div className="draw-btns">
                <div onClick={() => setTag('next')} className={tag === 'next' ? 'lq-button  blue-button' : 'lq-button  navy-button'}>
                    Next Draw
                </div>

                <div onClick={() => setTag('past')} className={tag === 'past' ? 'lq-button  blue-button' : 'lq-button  navy-button'}>
                    Past Draws
                </div>
            </div>

            {tag === 'next' ? 
                <>
                    <div className="lottery-info">
                        <PrizeStatus/>
                        <Tickets/>
                    </div>
                    <div className="lottery-info">
                        <WinnerInfo/>
                    </div>
                </>
                 :
                <div className="lottery-info">
                    <Round />
                    <History />
                </div>
            }

        </div>


    </>);
}

export default Lottery;