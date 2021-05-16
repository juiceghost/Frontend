import { useWeb3React } from '@web3-react/core';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { useApprove } from '../hooks/useApprove';
import { useStake } from '../hooks/useStake';
import { useUnStake } from '../hooks/useUnStake';
import { getExplorerAddress } from '../utils';
import { getMasterChefAddress } from '../utils/addressHelpers';
import StakeModal from './StakeModal';
import BigNumber from 'bignumber.js';
import { isZero, ZERO } from '../config/constants/numbers';
import { getFullDisplayBalance } from '../utils/formatNumber';
import store from '../store'
import { addToken } from '../utils/AddToken';
import { QuoteToken } from '../config/constants/types';
import './farm.scss'

const Farm = ({ farm, prices, userInfo, forceUpdate, active, stakeOnly }) => {

    const { account, chainId } = useWeb3React()
    const MasterChefAddress = getMasterChefAddress(chainId)
    const [stakePopup, setStakePopup] = useState(false)
    const [unStakePopup, setUnStakePopup] = useState(false)
    const [details, setDetails] = useState(false)
    const [stakeInput, setStakeInput] = useState(0)
    const [unStakeInput, setUnStakeInput] = useState(0)
    const [requestedApproval, setRequestedApproval] = useState(true)
    const { onApprove } = useApprove(farm, MasterChefAddress, chainId)
    const { onStake } = useStake(farm, stakeInput)
    const { onUnStake } = useUnStake(farm, unStakeInput)
    const { onUnStake: onHarvest } = useUnStake(farm, 0)
    const lpBalance = userInfo ? getFullDisplayBalance(userInfo.tokenBalance, 18) : 0
    const stakedBalance = userInfo ? getFullDisplayBalance(userInfo.stakedBalance) : 0
    const earnings = userInfo ? getFullDisplayBalance(userInfo.earnings) : 0
    const allowance = userInfo ? new BigNumber(userInfo.allowance) : ZERO

    const handleApprove = useCallback(async () => {
        try {
            const tx = await onApprove()
            if (tx.status) {
                setRequestedApproval(false)
                forceUpdate()
            } else {
                console.log("Approve Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onApprove, forceUpdate])

    const handleStake = useCallback(async () => {
        try {
            const tx = await onStake()
            if (tx.status) {
                forceUpdate()

            } else {
                console.log("Stake Failed");
            }
            setStakePopup(false)

        } catch (e) {
            console.error(e)
        }
    }, [onStake, forceUpdate])

    const handleUnStake = useCallback(async (amount) => {
        try {
            const tx = await onUnStake()
            if (tx.status) {
                forceUpdate()

            } else {
                console.log("UnStake Failed");
            }
            setUnStakePopup(false)
        } catch (e) {
            console.error(e)
        }
    }, [onUnStake, forceUpdate])

    const handleHarvest = useCallback(async () => {
        try {
            const tx = await onHarvest()
            if (tx.status) {
                forceUpdate()

            } else {
                console.log("Harvest Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onHarvest, forceUpdate])

    const priceQuoteToken = farm.quoteTokenSymbol === QuoteToken.FUSDT ? 1 : prices[farm.quoteTokenSymbol]
    const { lqdrPerBlock, lpTotalInQuoteToken, totalStaked, poolWeight, isTokenOnly } = farm
    const lqdrPrice = new BigNumber(prices["LQDR"])
    // console.log(farm.lpSymbol, lpTotalInQuoteToken.toString(), priceQuoteToken, farm?.totalStaked.toFixed());
    // console.log(lpTotalInQuoteToken.times(priceQuoteToken).div(farm?.totalStaked).toFormat(1));
    if ((stakeOnly && userInfo && isZero(userInfo.stakedBalance)) || (active && isZero(poolWeight))) {
        return (<></>)
    }

    return (<>
        <div className="col-md-4">
            <div className="deposit-cell">
                <div className="deposit-cell-header px-4">
                    <img src={`/img/farm_icons/${farm.icon}`}
                        className="farm-icon ml-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => addToken(farm.lpAddresses[250], farm.lpShortSymbol)}
                        alt="deposit"
                    />
                    <div className="text-right overflow-hidden">
                        <div className="deposit-cell-header-text">{farm.lpSymbol}</div>
                        <div className="px-3 text-bold text-center text-primary d-inline rounded-2" style={{ background: '#61AAFE' }}>{farm?.multiplierShow}</div>
                    </div>
                </div>
                <div className="deposit-cell-content px-4 py-2">
                    {account && <div className="earn-container">
                        <div>
                            <div className="text-primary small">LQDR Earned</div>
                            <div className="text-white large font-weight-bold">
                                {isZero(earnings) ? "0" : Number(earnings).toFixed(4)}
                            </div>
                            <div className="text-primary smaller">-{lqdrPrice.times(earnings).toFixed(2)}USD</div>
                        </div>
                        <div className="d-flex align-items-center" onClick={handleHarvest}>
                            <div className="btn btn-secondary">Harvest</div>
                        </div>
                    </div>}
                    {!account ?
                        <div className="btn btn-secondary w-100 my-4"
                            onClick={() => {
                                store.showConnectPopup()
                            }}>
                            Connect Wallet
                        </div>
                        :
                        !requestedApproval || allowance.gt(0) ?
                            <div className="text-center">

                                {farm.isDisable ?
                                    <div className="col-5  center btn btn-secondary w-100 my-4 mx-2">
                                        Stake
                                    </div> :
                                    <div className="col-5  center btn btn-primary w-100 my-4 mx-2"
                                        onClick={
                                            () => {
                                                setStakePopup(true)
                                            }}>
                                        Stake
                                    </div>
                                }
                                <div className="col-5 center btn btn-primary w-100 my-4 mx-2"
                                    onClick={
                                        () => {
                                            setUnStakePopup(true)
                                        }}>
                                    Withdraw
                                </div>
                            </div>
                            :
                            <div className="btn btn-primary w-100 my-4"
                                onClick={handleApprove}>
                                Approve Pool
                            </div>
                    }

                    <div className="d-flex justify-content-between">
                        <div className="text-white">APR:</div>
                        <div className="text-white" style={{ textAlign: "right" }}>
                            {prices && priceQuoteToken !== 0 && !isZero(lpTotalInQuoteToken) && !isNaN(poolWeight) ?
                                new BigNumber(lqdrPerBlock.times(poolWeight).times(prices["LQDR"]).times(31536000))
                                    .div(lpTotalInQuoteToken.times(priceQuoteToken)).times(100).toFormat(0)
                                : "0"
                            } %
                        </div>
                    </div>

                    {account && <div className="d-flex justify-content-between">
                        <div className="text-white">Your Stake:</div>
                        <div className="text-white" style={{ textAlign: "right" }}>{isZero(stakedBalance) ? 0 :
                            new BigNumber(stakedBalance).isLessThan(0.00001) ? "<0.00001" :
                                new BigNumber(stakedBalance).toFormat(5)} {farm.lpSymbol}</div>
                    </div>}

                    <div className="w-100 my-4 see-details" onClick={() => setDetails(!details)}>
                        <span>See Details</span>
                        <i className={details ? "fas fa-sort-up" : "fas fa-sort-down"} style={details ? {
                            marginTop: '0.5rem'
                        } : {
                            marginBottom: '0.5rem'
                        }}></i>
                    </div>

                    {details && <>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">Total Staked:</div>
                            <div className="text-white" style={{ textAlign: "right" }}> {new BigNumber(totalStaked).toFormat(4)}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">Deposit fee:</div>
                            <div className="text-white" style={{ textAlign: "right" }}> {farm?.depositFeeBP / 100}%</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">{isTokenOnly ? "LQDR" : "LP"} Price:</div>
                            <div className="text-white"> ${(priceQuoteToken && !isZero(totalStaked)) ? lpTotalInQuoteToken.times(priceQuoteToken).div(totalStaked).toFormat(1) : 0} </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="text-white">TVL:</div>
                            <div className="text-white"> ${!priceQuoteToken ? 0 : lpTotalInQuoteToken.times(priceQuoteToken).toFormat(0)} </div>
                        </div>
                    </>
                    }
                    <div className="my-2">
                        <a className="text-white" href={getExplorerAddress(farm.lpAddresses, chainId)} rel="noreferrer" target="_blank">
                            <i className="fas fa-clipboard" />
                            <u className="small ml-1 pointer">View on ftmscan</u>
                        </a>
                    </div>
                </div>
            </div>
        </div >
        <StakeModal
            title="Deposit"
            show={stakePopup}
            onClose={() => setStakePopup(false)}
            onConfirm={handleStake}
            amount={lpBalance}
            symbol={farm.lpSymbol}
            inputAmount={stakeInput}
            setInputAmount={setStakeInput}
            onMax={() => setStakeInput(lpBalance)}
            type="Deposit"
        />
        <StakeModal
            title="Withdraw"
            show={unStakePopup}
            onClose={() => setUnStakePopup(false)}
            onConfirm={handleUnStake}
            amount={stakedBalance}
            symbol={farm.lpSymbol}
            inputAmount={unStakeInput}
            setInputAmount={setUnStakeInput}
            onMax={() => setUnStakeInput(stakedBalance)}
            type="Withdraw"
        />
    </>);
}

export default observer(Farm);