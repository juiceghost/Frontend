import React from 'react';
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className="navbar-wrap">
            <a to="/" className="logo-wrap">
                <img src="/img/svg/liquid-logo.svg" />
                <img className="name" src="/img/svg/liquid-name.svg" />
            </a>

            <ul>
                <li>

                    <div className="icon-wrap"> <img src="/img/svg/Home.svg" /></div>
                    <p>Home</p>
                </li>
                <li>
                    <div className="icon-wrap"><img className="lottery" src="/img/svg/Lottery.svg" /></div>
                    <p>Lottery</p>
                </li>
                <li>
                    <div className="icon-wrap">   <img src="/img/svg/Github.svg" /></div>
                    <p>Github</p>
                </li>
                <li>
                    <div className="icon-wrap"> <img src="/img/svg/Bridge.svg" /></div>
                    <p>Bridge</p>
                </li>
                <li>
                    <div className="icon-wrap">   <img src="/img/svg/Medium.svg" /></div>
                    <p>Medium</p>
                </li>
                <li>
                    <div className="icon-wrap">    <img src="/img/svg/Document.svg" /></div>
                    <p>Documentation</p>
                </li>
            </ul>
            <div className="connect-wallet-wrap">
                <div className="connect-wallet">
                    <p> Connect Wallet</p>
                    <img src="/img/svg/Wallet.svg" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;