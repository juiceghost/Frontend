import React, {useEffect, useState, useCallback} from 'react';
import { useWeb3React } from '@web3-react/core';
import useWeb3 from "../../hooks/useWeb3";
import BigNumber from 'bignumber.js'
import Modal from 'react-modal';
import {useBuyTickets} from '../../hooks/useBuyTickets';
import {fetchCostWithDiscount} from '../../utils/fetchLotteryData';


import './modal.scss'

Modal.setAppElement('#root')

const BuyTicketModal = ({ modalIsOpen, setIsOpen, lotteryId, lotterySize, maxRange, ticketPrice, lqdrBalance }) => {
    const {onBuyTickets} = useBuyTickets(lotteryId, lotterySize, maxRange)
    const [ticketsAmount, setTicketsAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const { chainId } = useWeb3React()
    const web3 = useWeb3()

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onExchange(e) {
        const digitsOnly = e.target.value.replace('.', '')
        setTicketsAmount(Math.min(digitsOnly, 50))
    }

    function handleMax() {
        setTicketsAmount(ticketPrice > 0 ? Math.min(Math.floor(lqdrBalance / ticketPrice), 50) : 0)
    }

    const onBuy = async () => {
        const res = await onBuyTickets(ticketsAmount ? ticketsAmount : 0)
        if (res) closeModal()
    }

    const getCostWithDiscount = useCallback(async () => {
        const val = await fetchCostWithDiscount(web3, chainId, lotteryId, ticketsAmount)
        setTotalPrice(val)
    }, [ticketsAmount, web3, chainId, lotteryId])

    useEffect(() => {
        getCostWithDiscount()
    }, [ticketsAmount, getCostWithDiscount])

    return (<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgb(0 0 0 / 70%)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                color: "#ffffff",
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '95%',
                maxWidth: '480px',
                width: '80%',
                background: 'rgba(3, 6, 41, 0.72)',
                border: '1px solid #083258',
                borderRadius: '24px',
                padding: '20px'
            }
        }}
    >

        <div className="buy-ticket-modal ">
            <div className="title-wrap">
                <p >Buy Tickets</p>

                <svg onClick={closeModal} width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.69971 5.69992L17.0996 17.0999" stroke="#4DD9F6" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.0996 5.69995L5.69971 17.0999" stroke="#4DD9F6" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>

            <div className="amounts-wrap">
                <p >1 Ticket = {new BigNumber(ticketPrice).div(10 ** 18).toFormat(2)}LQDR</p>
                <p >{new BigNumber(lqdrBalance).div(10 ** 18).toFormat(2)} LQDR Available</p>
            </div>


            <div className="input-wrap">
                <input
                    type="number"
                    placeholder="0.0"
                    value={ticketsAmount}
                    onChange={(e) => onExchange(e)}
                    />
                <div className="lq-button navy-button max-btn" onClick={() => handleMax()}>Max</div>
            </div>

            <div className="spend">
                You will spend <span className="lqdr-blue" > {new BigNumber(totalPrice).div(10 ** 18).toFormat(2)} LQDR</span>
            </div>

            <div className="action-btns">

                <div className=" lq-button navy-button cancel" onClick={closeModal}>
                    Cancel
                </div>

                <div className="lq-button blue-button buy" onClick={onBuy}>
                    Buy
                </div>

            </div>

            <div className="lqdr-blue purchases">
                Ticket purchases are final. Your LQDR cannot be returned after buying tickets!
            </div>

        </div>


    </Modal>);
}

export default BuyTicketModal;