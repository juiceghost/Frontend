
import React from 'react';
import Modal from 'react-modal';

import './modal.scss'

Modal.setAppElement('#root')

const WithdrawModal = ({ modalIsOpen, setIsOpen, title, onConfirm, amount, symbol, inputAmount, setInputAmount, onMax }) => {

    function closeModal() {
        setIsOpen(false);
    }

    return (<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgb(0 0 0 / 80%)'
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
                <p >{title} {symbol} Tokens</p>

                <svg onClick={closeModal} width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.69971 5.69992L17.0996 17.0999" stroke="#4DD9F6" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.0996 5.69995L5.69971 17.0999" stroke="#4DD9F6" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>

            <div className="amounts-wrap">
                <p ></p>
                <p >{amount} {symbol} Available</p>
            </div>


            <div className="input-wrap">
                <input
                    type="number"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.currentTarget.value)}
                    placeholder="0.0" />
                <div className="lq-button navy-button max-btn" onClick={onMax}>Max</div>
            </div>

            <div className="spend">

            </div>

            <div className="action-btns">

                <div className=" lq-button navy-button cancel" onClick={closeModal}>
                    Cancel
                </div>

                <div className="lq-button blue-button buy" onClick={onConfirm}>
                    Confirm
                </div>

            </div>


        </div>


    </Modal>);
}

export default WithdrawModal;