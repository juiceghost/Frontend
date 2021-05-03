import { useWeb3React } from '@web3-react/core';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import farms from '../config/constants/farms';
import { useAllowance } from '../hooks/useAllowance';
import { useApprove } from '../hooks/useApprove';
import store from '../store';
import { getMasterChefAddress } from '../utils/addressHelpers';


const Farm = ({ pid }) => {

    console.log(farms[pid]);
    const { account, chainId } = useWeb3React()
    const MasterChefAddress = getMasterChefAddress(chainId)
    const [forceUpdate, setForceUpdate] = useState(0)
    const allowance = useAllowance(farms[pid], MasterChefAddress, chainId, forceUpdate)
    console.log("allowance ", allowance.toString());
    const { onApprove } = useApprove(farms[pid], MasterChefAddress, chainId, forceUpdate)

    const handleApprove = useCallback(async () => {
        try {
            const tx = await onApprove()
            if (tx.status) {
                setForceUpdate(forceUpdate => forceUpdate + 1)
            } else {
                console.log("Approve Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onApprove])


    return (<div className="col-4">
        <div className="deposit-cell">
            <div className="deposit-cell-header">
                <div className="white-circle" />
                <div className="deposit-cell-header-text">SUSHI Pool</div>
            </div>
            <div className="deposit-cell-content px-4 py-2">
                <div className="earn-container">
                    <div>
                        <div className="text-primary small">LQDR Earned</div>
                        <div className="text-white large font-weight-bold">
                            0.00
                        </div>
                        <div className="text-primary smaller">-0.00USD</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="btn btn-secondary">Harvest</div>
                    </div>
                </div>
                {!account ?
                    <div className="btn btn-secondary w-100 my-4"
                        onClick={handleApprove}>
                        Connect Wallet
                </div>
                    :
                    allowance.gt(0) ?
                        <div className="btn btn-primary w-100 my-4"
                            onClick={
                                () => {
                                    store.showAmountPopup()
                                }}>
                            Stake
                    </div>
                        :
                        <div className="btn btn-primary w-100 my-4"
                            onClick={handleApprove}>
                            Approve Pool
                </div>
                }

                < div className="d-flex justify-content-between">
                    <div className="text-white">APR:</div>
                    <div className="text-white">350%</div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="text-white">Your Stake:</div>
                    <div className="text-white">0SUSHI</div>
                </div>

                <div className="btn btn-primary w-100 my-4">
                    See Details
                    </div>

                <div className="d-flex justify-content-between">
                    <div className="text-white">Total staked:</div>
                    <div className="text-white">100000 SUSHI</div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="text-white">End:</div>
                    <div className="text-white">0SUSHI</div>
                </div>

                <div className="my-2">
                    <a className="text-white">
                        <i className="fas fa-clipboard" />
                        <u className="small ml-1 pointer">View on fantomscan</u>
                    </a>
                </div>
            </div>
        </div>
    </div >);
}

export default observer(Farm);