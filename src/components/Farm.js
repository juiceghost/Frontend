import { useWeb3React } from '@web3-react/core';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { useAllowance } from '../hooks/useAllowance';
import { useApprove } from '../hooks/useApprove';
import useFarmUser from '../hooks/useFarmUser';
import { useStake } from '../hooks/useStake';
import { useUnStake } from '../hooks/useUnStake';
import { getExplorerAddress } from '../utils';
import { getMasterChefAddress } from '../utils/addressHelpers';
import StakeModal from './StakeModal';
import './farm.scss'
import BigNumber from 'bignumber.js';

const Farm = ({ farm, prices }) => {

    // console.log(farm);
    const { account, chainId } = useWeb3React()
    const MasterChefAddress = getMasterChefAddress(chainId)
    const [forceUpdate, setForceUpdate] = useState(0)
    const [stakePopup, setStakePopup] = useState(false)
    const [unStakePopup, setUnStakePopup] = useState(false)
    const [details, setDetails] = useState(false)

    const [stakeInput, setStakeInput] = useState(0)
    const [unStakeInput, setUnStakeInput] = useState(0)
    const allowance = useAllowance(farm, MasterChefAddress, chainId, forceUpdate)
    // console.log("allowance ", allowance.toString());
    const { onApprove } = useApprove(farm, MasterChefAddress, chainId)
    const { onStake } = useStake(farm, stakeInput)
    const { onUnStake } = useUnStake(farm, unStakeInput)
    const { onUnStake: onHarvest } = useUnStake(farm, 0)
    const { lpBalance, stakedBalance, earnings } = useFarmUser(farm, forceUpdate)
    // console.log("tokenBalance ", lpBalance);
    // console.log("stakedBalance ", stakedBalance);
    // console.log("earnings ", earnings);

    const handleApprove = useCallback(async () => {
        try {
            const tx = await onApprove()
            setForceUpdate(forceUpdate => forceUpdate + 1)
            if (tx.status) {
            } else {
                console.log("Approve Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onApprove])

    const handleStake = useCallback(async () => {
        try {
            const tx = await onStake()
            if (tx.status) {
                setForceUpdate(forceUpdate => forceUpdate + 1)
            } else {
                console.log("Stake Failed");
            }
            setStakePopup(false)

        } catch (e) {
            console.error(e)
        }
    }, [onStake])

    const handleUnStake = useCallback(async (amount) => {
        try {
            const tx = await onUnStake()
            if (tx.status) {
                setForceUpdate(forceUpdate => forceUpdate + 1)
            } else {
                console.log("UnStake Failed");
            }
            setUnStakePopup(false)
        } catch (e) {
            console.error(e)
        }
    }, [onUnStake])

    const handleHarvest = useCallback(async () => {
        try {
            const tx = await onHarvest()
            if (tx.status) {
                setForceUpdate(forceUpdate => forceUpdate + 1)
            } else {
                console.log("Harvest Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onHarvest])

    // const { getAmountsOut } = useGetAmountsOut({ address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", decimals: 18 }, { address: "0x049d68029688eabf473097a2fc38ef61633a3c7a", decimals: 6 }, 1)



    const { lqdrPerBlock, lpTotalInQuoteToken, multiplier, poolWeight } = farm
    const lqdrPrice = new BigNumber(prices["LQDR"])
    // console.log(prices[farm.quoteTokenSymbol], prices);
    return (<>
        <div className="col-md-4">
            <div className="deposit-cell">
                <div className="deposit-cell-header px-4">
                    <img src="/img/farm_icons/link_ftm.png" className="farm-icon ml-2" />
                    <div className="text-right">
                        <div className="deposit-cell-header-text">{farm.lpSymbol} Pool</div>
                        <div className="px-3 text-bold text-center text-primary d-inline rounded-2" style={{ background: '#61AAFE' }}>{farm?.multiplierShow}</div>
                    </div>
                </div>
                <div className="deposit-cell-content px-4 py-2">
                    <div className="earn-container">
                        <div>
                            <div className="text-primary small">LQDR Earned</div>
                            <div className="text-white large font-weight-bold">
                                {Number(earnings).toFixed(4)}
                            </div>
                            <div className="text-primary smaller">-{lqdrPrice.times(earnings).toFixed(2)}USD</div>
                        </div>
                        <div className="d-flex align-items-center" onClick={handleHarvest}>
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
                            <div className="text-center"><div className="col-5  center btn btn-primary w-100 my-4 mx-2"
                                onClick={
                                    () => {
                                        setStakePopup(true)
                                    }}>
                                Stake
                    </div>
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

                    {/* <div className="d-flex justify-content-between">
                        <div className="text-white">APR:</div>
                        <div className="text-white">350%</div>
                    </div> */}

                    <div className="d-flex justify-content-between">
                        <div className="text-white">APR:</div>
                        <div className="text-white">
                            {prices[farm.quoteTokenSymbol] !== 0 && new BigNumber(lqdrPerBlock.times(poolWeight).times(prices["LQDR"]).times(31536000))
                                .div(lpTotalInQuoteToken.times(prices[farm.quoteTokenSymbol])).toFixed(2)}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="text-white">Your Stake:</div>
                        <div className="text-white">{stakedBalance} {farm.lpSymbol}</div>
                    </div>

                    <div className="w-100 my-4 see-details" onClick={() => setDetails(!details)}>
                        <span>See Details</span>
                        <i class={details ? "fas fa-sort-up" : "fas fa-sort-down"} style={details ? {
                            marginTop: '0.5rem'
                        } : {
                            marginBottom: '0.5rem'
                        }}></i>
                    </div>

                    {details && <>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">Total Staked:</div>
                            <div className="text-white"> {farm?.totalStaked}  {farm.lpSymbol}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">Deposit fee:</div>
                            <div className="text-white"> {farm?.depositFeeBP} </div>
                        </div>
                        {/* <div className="d-flex justify-content-between">
                            <div className="text-white">poolWeight:</div>
                            <div className="text-white"> {farm?.poolWeight} </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">tokenPriceVsQuote:</div>
                            <div className="text-white"> {farm?.tokenPriceVsQuote} </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-white">lpTotalInQuoteToken:</div>
                            <div className="text-white"> {farm?.lpTotalInQuoteToken.toFixed(5)} </div>
                        </div> */}
                        {/* <div className="d-flex justify-content-between">
                            <div className="text-white">tokenAmount:</div>
                            <div className="text-white"> {farm?.tokenAmount} </div>
                        </div> */}
                    </>
                    }

                    {/* <div className="d-flex justify-content-between">
                    <div className="text-white">End:</div>
                    <div className="text-white">0SUSHI</div>
                </div> */}

                    <div className="my-2">
                        <a className="text-white" href={getExplorerAddress(farm.lpAddresses, chainId)} rel="none refer">
                            <i className="fas fa-clipboard" />
                            <u className="small ml-1 pointer">View on ftmscan</u>
                        </a>
                    </div>
                </div>
            </div>
        </div >
        <StakeModal
            show={stakePopup}
            onClose={() => setStakePopup(false)}
            onConfirm={handleStake}
            amount={lpBalance}
            symbol={farm.lpSymbol}
            inputAmount={stakeInput}
            setInputAmount={setStakeInput}
            onMax={() => setStakeInput(lpBalance)}
        />
        <StakeModal
            show={unStakePopup}
            onClose={() => setUnStakePopup(false)}
            onConfirm={handleUnStake}
            amount={stakedBalance}
            symbol={farm.lpSymbol}
            inputAmount={unStakeInput}
            setInputAmount={setUnStakeInput}
            onMax={() => setUnStakeInput(stakedBalance)}
        />
    </>);
}

export default observer(Farm);