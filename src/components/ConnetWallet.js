import React from 'react';
import { observer } from 'mobx-react'
import { useWeb3React } from '@web3-react/core'

import store from '../store'

const ConnectWallet = ({ style, rest }) => {
    const { account } = useWeb3React()

    return (account ?
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
                store.showConnectPopup()
            }}
            {...rest} style={style} >
            <p> Connect Wallet</p>
            <img src="/img/svg/Wallet.svg" alt={"wallet"} />
        </div>);
}

export default observer(ConnectWallet);