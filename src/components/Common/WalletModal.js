import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../utils/connectors';

Modal.setAppElement('#root')

const WithdrawModal = ({ open, setOpen }) => {

    const { account, activate } = useWeb3React()

    useEffect(() => {
        if (account) {
            setOpen(false)
        }
    }, [account, setOpen])

    function closeModal() {
        setOpen(false)
    }

    return (<Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel="WithdrawModal"
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
                background: 'rgba(3, 6, 41, 0.5)',
                border: '1px solid #083258',
                borderRadius: '24px',
                padding: '20px'
            }
        }}
    >

        <div className="buy-ticket-modal ">
            <div className="title-wrap">
                <p >Connect to a wallet</p>
                <svg onClick={closeModal} width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.69971 5.69992L17.0996 17.0999" stroke="#4DD9F6" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.0996 5.69995L5.69971 17.0999" stroke="#4DD9F6" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>



            <div className="items" style={{ display: "flex", height: "50px", justifyContent: "space-between", alignItems: "center", padding: "0 10px", background: "#060c39", marginTop: "20px", cursor: "pointer" }} onClick={() => {
                activate(injected)
                closeModal()
            }}>
                <p >Metamask</p>
                <img src={`/img/metamask.png`} style={{ marginLeft: "9px", height: "30px" }} alt="metamask" />
            </div>



        </div>


    </Modal>);
}

export default WithdrawModal;