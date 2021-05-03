
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { useWeb3React } from '@web3-react/core'
import store from '../store'

const LiquidNavbar = () => {
    const { account, deactivate } = useWeb3React()
    return (<Navbar bg="dark" variant="dark" className="px-5" style={{ zIndex: 100 }}>
        <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
                src={`${process.env.PUBLIC_URL}/img/logo.png`}
                style={{ width: '2em', marginRight: '0.5rem' }}
            />
            <span className="title">Liquid Driver</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link href="https://github.com" className="font-weight-bold mx-2">
                GitHub
          </Nav.Link>
            <Nav.Link
                href="https://multichain.xyz/"
                className="font-weight-bold mx-2"
            >
                Bridge
          </Nav.Link>
            <Nav.Link
                href="https://medium.com/@LiquidDriver"
                className="font-weight-bold mx-2"
            >
                Medium
          </Nav.Link>
            <Nav.Link
                href="https://docs.liquiddriver.finance/"
                className="font-weight-bold mx-2"
            >
                Documentation
          </Nav.Link>
            {account && (
                <>
                    <Nav.Link
                        className="font-weight-bold bg-primary px-3 mx-2 rounded-2"
                        onClick={() => { }}
                    >
                        Account:{' '}
                        {account.substring(0, 5) +
                            '...' +
                            account[account.length - 1]}
                    </Nav.Link>
                    <Nav.Link
                        className="font-weight-bold bg-danger px-3 mx-2 rounded-2"
                        onClick={deactivate}
                    >
                        Disconnect
              </Nav.Link>
                </>
            )}
            {!account && (
                <Nav.Link
                    className="font-weight-bold bg-primary px-3 mx-2 rounded-2 text-nowrap"
                    onClick={() => {
                        store.showConnectPopup()
                    }}
                >
                    Connect Wallet
                </Nav.Link>
            )}
        </Nav>
    </Navbar >);
}

export default observer(LiquidNavbar);



