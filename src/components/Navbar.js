import React from 'react';
import './Navbar.scss'
import ConnectWallet from './ConnetWallet';

const Navbar = () => {
    return (
        <div className="navbar-wrap">
            <a href="/" className="logo-wrap">
                <img alt={"icon"} src="/img/svg/liquid-logo.svg" />
                <img alt={"icon"} className="name" src="/img/svg/liquid-name.svg" />
            </a>

            <ul>
                <li>

                    <div className="icon-wrap"> <img alt={"icon"} src="/img/svg/Home.svg" /></div>
                    <p>Home</p>
                </li>
                <li>
                    <div className="icon-wrap"><img alt={"icon"} className="lottery" src="/img/svg/Lottery.svg" /></div>
                    <p>Lottery</p>
                </li>
                <li>
                    <div className="icon-wrap">   <img alt={"icon"} src="/img/svg/Github.svg" /></div>
                    <p>Github</p>
                </li>
                <li>
                    <div className="icon-wrap"> <img alt={"icon"} src="/img/svg/Bridge.svg" /></div>
                    <p>Bridge</p>
                </li>
                <li>
                    <div className="icon-wrap">   <img alt={"icon"} src="/img/svg/Medium.svg" /></div>
                    <p>Medium</p>
                </li>
                <li>
                    <div className="icon-wrap">    <img alt={"icon"} src="/img/svg/Document.svg" /></div>
                    <p>Documentation</p>
                </li>
            </ul>
            <ConnectWallet style={{margin:"0 10px"}}/>
        </div>
    );
}

export default Navbar;