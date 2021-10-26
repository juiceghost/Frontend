import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import WalletModal from "./WalletModal";

const ConnectWallet = ({ style, rest, type = 0 }) => {
  const { account } = useWeb3React();
  const [open, setOpen] = useState(false);
  return (
    <>
      <WalletModal open={open} setOpen={setOpen} />
      {account ? (
        <div
          className={`lq-button ${type === 0
            ? "blue-button"
            : type === 1
              ? "spirit-button"
              : type === 2
                ? "spooky-button"
                : type === 3 ?
                  "waka-button"
                  : "magic-button"
            } `}
          style={style}
          {...rest}
        >
          {account.substring(0, 5) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </div>
      ) : (
        <div
          className={`lq-button ${type === 0
            ? "blue-button"
            : type === 1
              ? "spirit-button"
              : type === 2
                ? "spooky-button"
                : type === 3 ?
                  "waka-button"
                  : "magic-button"
            } flex-sb`}
          onClick={() => {
            console.log("clicked");
            setOpen(true);
          }}
          {...rest}
          style={style}
        >
          <p> Connect Wallet</p>
          <img src="/img/svg/Wallet.svg" alt={"wallet"} />
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
