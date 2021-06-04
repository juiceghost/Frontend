import React from 'react';
import './Navbar.scss'
import ConnectWallet from './ConnetWallet';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-wrap">
            <a href="/" className="logo-wrap">
                <img alt={"icon"} src="/img/svg/liquid-logo.svg" />
                <img alt={"icon"} className="name" src="/img/svg/liquid-name.svg" />
            </a>

            <ul>
                <li>
                    <NavLink to="/" exact={true}>
                        <div className="icon-wrap"> <img alt={"icon"} src="/img/svg/Home.svg" /></div>
                        <p>Home</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/farms" exact={true}>
                        <div className="icon-wrap"><img alt={"icon"} className="lottery" src="/img/svg/Lottery.svg" /></div>
                        <p>Farms</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/lottery" exact={true}>
                        <div className="icon-wrap"><img alt={"icon"} className="lottery" src="/img/svg/Lottery.svg" /></div>
                        <p>Lottery</p>
                    </NavLink>

                </li>
                <li>
                    <a href="https://github.com/LiquidDriver-finance" target="_blank" rel="noreferrer" >
                        <div className="icon-wrap">   <img alt={"icon"} src="/img/svg/Github.svg" /></div>
                        <p>Github</p>
                    </a>

                </li>
                <li>
                    <a href="https://multichain.xyz/" target="_blank" rel="noreferrer" >
                        <div className="icon-wrap"> <img alt={"icon"} src="/img/svg/Bridge.svg" /></div>
                        <p>Bridge</p>
                    </a>

                </li>
                <li>
                    <a href="https://medium.com/@LiquidDriver" target="_blank" rel="noreferrer" >
                        <div className="icon-wrap">   <img alt={"icon"} src="/img/svg/Medium.svg" /></div>
                        <p>Medium</p>
                    </a>
                </li>
                <li>
                    <a href="https://docs.liquiddriver.finance/" target="_blank" rel="noreferrer" >
                        <div className="icon-wrap">    <img alt={"icon"} src="/img/svg/Document.svg" /></div>
                        <p>Documentation</p>
                    </a>

                </li>
            </ul>
            <ConnectWallet style={{ margin: "0 10px" }} />
        </div>
    );
}

export default Navbar;