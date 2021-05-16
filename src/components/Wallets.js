import React from 'react';
import { Modal } from 'react-bootstrap'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useWeb3React } from '@web3-react/core'
import { UnsupportedChainIdError } from '@web3-react/core'
import { NotificationManager } from 'react-notifications'
import store from '../store'
import { addRPC } from '../utils/addRPC';
import { injected } from '../utils/connectors';

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
    }, [error, account])

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
            </Modal.Body>
        </Modal>);
}

export default observer(Wallets);

