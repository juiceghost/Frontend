import React from 'react';
import { Modal } from 'react-bootstrap'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useWeb3React } from '@web3-react/core'
import { UnsupportedChainIdError } from '@web3-react/core'
import { NotificationManager } from 'react-notifications'
import { injected } from '../connectors'
import store from '../store'
import { addRPC } from '../utils/addRPC';

const Wallets = () => {

    const { account, chainId, activate, error } = useWeb3React()
    console.log(account, chainId, error);

    useEffect(() => {
        if (account) {
            store.hideConnectPopup()
        }
    }, [account, chainId])

    useEffect(() => {
        if (error instanceof UnsupportedChainIdError) {
            NotificationManager.error(
                <>
                    <p>Please make sure to set the right network (Fantom Network) </p>
                    <div style={{ background: "blue", display: "inline-block", borderRadius: "6px", textAlign: "center", padding: "10px 10px", margin: "auto", marginTop: "20px" }} onClick={() => addRPC(account, 250)}>Switch to Fantom</div>
                </>, 'Error'
            )
        }
    }, [error])

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="connect-wallet"
            show={store.show_connect}
            onHide={() => {
                store.hideConnectPopup()
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Connect to a wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    className="connect-wallet-row"
                    onClick={() => {
                        console.info('Connect Matamask!')
                        activate(injected)
                    }}
                >
                    <div>Metamask</div>
                    <img
                        src={`${process.env.PUBLIC_URL}/img/metamask.png`}
                        className="logo"
                        alt="logo"
                    />
                </div>
{/* 
                <div className="connect-wallet-row disabled">
                    <div>Trust Wallet</div>
                    <img
                        src={`${process.env.PUBLIC_URL}/img/trust_wallet.png`}
                        className="logo"
                        alt="logo"
                    />
                </div>

                <div className="connect-wallet-row disabled">
                    <div>TokenPocket Wallet</div>
                    <img
                        src={`${process.env.PUBLIC_URL}/img/token_pocket_wallet.png`}
                        className="logo"
                        alt="logo"
                    />
                </div>

                <div className="connect-wallet-row disabled">
                    <div>WalletConnect</div>
                    <img
                        src={`${process.env.PUBLIC_URL}/img/wallet_connect.png`}
                        className="logo"
                        alt="logo"
                    />
                </div> */}

                <div className="text-center">
                    <a className="btn btn-link" role="button">
                        <i className="far fa-question-circle h5 mr-1" />
              Learn how to connect wallet
            </a>
                </div>
            </Modal.Body>
        </Modal>);
}

export default observer(Wallets);

