import React, { useState } from "react";
import ConnectWallet from "./ConnetWallet";
import { NavLink } from "react-router-dom";
import useGoogleAnalytics from "../../hooks/useGoogleAnalytics";
import "./Navbar.scss";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  useGoogleAnalytics();

  return (
    <>
      <div className={`navbar-wrap ${openMenu ? "opened-nav" : ""}`}>
        <img
          className="close"
          src={`/img/svg/${openMenu ? "close" : "menu"}.svg`}
          alt="close"
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        />
        <a href="/" className="logo-wrap">
          <img alt={"icon"} src="/img/svg/liquid-logo.svg" />
          <img alt={"icon"} className="name" src="/img/svg/liquid-name.svg" />
        </a>

        <div className={`nav-content ${openMenu ? "opened-content" : ""} `}>
          <ul>
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to="/" exact={true}>
                <div className="icon-wrap">
                  {" "}
                  <img alt={"icon"} src="/img/svg/Home.svg" />
                </div>
                <p>Home</p>
              </NavLink>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to="/farms" exact={true}>
                <div className="icon-wrap">
                  <img
                    alt={"icon"}
                    className="lottery"
                    src="/img/svg/Farms.svg"
                  />
                </div>
                <p>Farms</p>
              </NavLink>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to="/lottery" exact={true}>
                <div className="icon-wrap">
                  <img
                    alt={"icon"}
                    className="lottery"
                    src="/img/svg/Lottery.svg"
                  />
                </div>
                <p>Lottery</p>
              </NavLink>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to="/xlqdr" exact={true}>
                <div className="icon-wrap">
                  <img alt={"icon"} className="xlqdr" src="/img/svg/lock.svg" />
                </div>
                <p>xLQDR</p>
              </NavLink>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <a
                href="https://github.com/LiquidDriver-finance"
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-wrap">
                  {" "}
                  <img alt={"icon"} src="/img/svg/Github.svg" />
                </div>
                <p>Github</p>
              </a>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <a
                href="https://spookyswap.finance/bridge"
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-wrap">
                  {" "}
                  <img alt={"icon"} src="/img/svg/Bridge.svg" />
                </div>
                <p>Bridge</p>
              </a>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <a
                href="https://medium.com/@LiquidDriver"
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-wrap">
                  {" "}
                  <img alt={"icon"} src="/img/svg/Medium.svg" />
                </div>
                <p>Medium</p>
              </a>
            </li>
            <li>
              <a
                href="https://docs.liquiddriver.finance/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-wrap">
                  {" "}
                  <img alt={"icon"} src="/img/svg/Document.svg" />
                </div>
                <p>Documentation</p>
              </a>
            </li>
            <li>
              <a
                href="https://app.sushi.com/swap?inputCurrency=ftm&outputCurrency=0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9"
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-wrap">
                  {" "}
                  <img alt={"icon"} src="/img/svg/cart.svg" />
                </div>
                <p>Buy LQDR</p>
              </a>
            </li>
          </ul>
          <div
            style={{
              padding: "18px 20px",
              borderTop: "1px solid #0B5079",
              borderBottom: "1px solid #0B5079",
            }}
          >
            <ConnectWallet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
