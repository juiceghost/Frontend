import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import WalletModal from './WalletModal';

const ConnectWallet = ({ style, rest }) => {
    const { account } = useWeb3React()
    const [open, setOpen] = useState(false)
    return (<>
        <WalletModal open={open} setOpen={setOpen} />
        {account ?
            <div className="lq-button blue-button " style={style}  {...rest} >
                {account.substring(0, 5) +
                    '...' +
                    account.substring(account.length - 4, account.length - 1)
                }
            </div>
            :
            <div className="lq-button blue-button flex-sb "
                onClick={() => {
                    console.log("clicked");
                    setOpen(true)
                }}
                {...rest} style={style} >
                <p> Connect Wallet</p>
                <img src="/img/svg/Wallet.svg" alt={"wallet"} />
            </div>}
    </>);
}

export default ConnectWallet;