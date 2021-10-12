import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useApprove } from "../../hooks/useApprove";
import { useStake } from "../../hooks/useStake";
import { useUnStake } from "../../hooks/useUnStake";
import { getExplorerAddress } from "../../utils";
import {
  getFtmRewarderAddress,
  getMasterChefAddress,
  getMiniChefAddress,
  getRewarderAddress,
  getSpellRewarderAddress,
} from "../../utils/addressHelpers";
import BigNumber from "bignumber.js";
import { isZero, ZERO } from "../../config/constants/numbers";
import { formatAmount, getFullDisplayBalance } from "../../utils/formatNumber";
import { QuoteToken } from "../../config/constants/types";
import ConnetWallet from "../Common/ConnetWallet";
import WithdrawModal from "./WidthdrawModal";
import { useHarvest } from "../../hooks/useHarvest";
import { useRewarder } from "../../hooks/useContract";

const Farm = ({ farm, prices, userInfo, forceUpdate, active, stakeOnly }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { account, chainId } = useWeb3React();
  const MasterChefAddress = getMasterChefAddress(chainId);
  const MiniChefAddress = getMiniChefAddress(chainId);
  const [stakePopup, setStakePopup] = useState(false);
  const [unStakePopup, setUnStakePopup] = useState(false);
  const [stakeInput, setStakeInput] = useState(0);
  const [unStakeInput, setUnStakeInput] = useState(0);
  const [secondEarnings, setSecondEarnings] = useState(new BigNumber(0));
  const [requestedApproval, setRequestedApproval] = useState(true);
  const { onApprove } = useApprove(farm, MasterChefAddress);
  const { onApprove: onMiniApprove } = useApprove(farm, MiniChefAddress);
  const { onStake } = useStake(farm, stakeInput);
  const { onUnStake } = useUnStake(farm, unStakeInput);
  const { onHarvest } = useHarvest(farm);
  const lpBalance = userInfo
    ? getFullDisplayBalance(userInfo.tokenBalance, 18)
    : 0;
  const stakedBalance = userInfo
    ? getFullDisplayBalance(userInfo.stakedBalance)
    : 0;
  const earnings = userInfo ? getFullDisplayBalance(userInfo.earnings) : 0;
  const allowance = userInfo ? new BigNumber(userInfo.allowance) : ZERO;
  const rewarderContract = useRewarder(getRewarderAddress());
  const ftmRewarderContract = useRewarder(getFtmRewarderAddress());
  const spellRewarderContract = useRewarder(getSpellRewarderAddress());

  const handleApprove = useCallback(async () => {
    try {
      let tx;
      if (farm.type > 0) {
        tx = await onMiniApprove();
      } else {
        tx = await onApprove();
      }
      if (tx.status) {
        setRequestedApproval(false);
        forceUpdate();
      } else {
        console.log("Approve Failed");
      }
    } catch (e) {
      console.error(e);
    }
  }, [onApprove, onMiniApprove, farm, forceUpdate]);

  const handleStake = useCallback(async () => {
    try {
      const tx = await onStake();
      if (tx.status) {
        forceUpdate();
      } else {
        console.log("Stake Failed");
      }
      setStakePopup(false);
    } catch (e) {
      console.error(e);
    }
  }, [onStake, forceUpdate]);

  const handleUnStake = useCallback(async () => {
    try {
      const tx = await onUnStake();
      if (tx.status) {
        forceUpdate();
      } else {
        console.log("UnStake Failed");
      }
      setUnStakePopup(false);
    } catch (e) {
      console.error(e);
    }
  }, [onUnStake, forceUpdate]);

  const handleHarvest = useCallback(async () => {
    try {
      const tx = await onHarvest();
      if (tx.status) {
        forceUpdate();
      } else {
        console.log("Harvest Failed");
      }
    } catch (e) {
      console.error(e);
    }
  }, [onHarvest, forceUpdate]);

  const getSecondEarnings = useCallback(async () => {
    if (account) {
      let rewards = 0;
      if (farm.type === 1 && farm.pid === 0) {
        rewards = await rewarderContract.methods
          .pendingToken(0, account)
          .call();
      } else if (farm.type === 1 && farm.pid === 1) {
        rewards = await ftmRewarderContract.methods
          .pendingToken(1, account)
          .call();
      } else if (farm.type === 1 && farm.pid === 22) {
        rewards = await spellRewarderContract.methods
          .pendingToken(22, account)
          .call();
      } else if (farm.type === 2 && farm.pid === 10) {
        rewards = await ftmRewarderContract.methods
          .pendingToken(10, account)
          .call();
      }
      setSecondEarnings(new BigNumber(rewards).div(1e18));
    } else {
      setSecondEarnings(new BigNumber(0));
    }
  }, [account, chainId, rewarderContract]);

  useEffect(() => {
    if (
      (farm.type === 1 && farm.pid === 0) ||
      (farm.type === 1 && farm.pid === 1) ||
      (farm.type === 1 && farm.pid === 22) ||
      (farm.type === 2 && farm.pid === 10)
    ) {
      getSecondEarnings();
    }
  }, [farm, getSecondEarnings]);

  const {
    lqdrPerBlock,
    lpTotalInQuoteToken,
    totalStaked,
    poolWeight,
    isTokenOnly,
    multiplier,
    rewardPerSecond,
    feeApr,
    tokenPriceVsQuote,
  } = farm;

  const priceQuoteToken = useMemo(() => {
    return farm.type === 4 ? tokenPriceVsQuote.toNumber() : prices[farm.quoteTokenSymbol];
  }, [farm.type, tokenPriceVsQuote, prices]);

  const totalLiquidityInUsd = useMemo(() => {
    return (farm.type === 4 ? totalStaked : lpTotalInQuoteToken).times(priceQuoteToken);
  }, [lpTotalInQuoteToken, priceQuoteToken, totalStaked, farm.type]);

  const buttonStyle = useMemo(() => {
    return farm.type === 1
      ? "spirit-button"
      : farm.type === 2
        ? "spooky-button"
        : farm.type === 3
          ? "waka-button"
          : farm.type === 4
            ? "magic-button"
            : "blue-button"
  }, [farm])
  const lqdrPrice = new BigNumber(prices["LQDR"]);
  const spiritPrice = new BigNumber(prices["SPIRIT"]);
  const ftmPrice = new BigNumber(prices["FTM"]);
  const spellPrice = new BigNumber(prices["SPELL"]);
  const tokensName = farm.lpSymbol.split("/");

  if (
    (stakeOnly && userInfo && isZero(userInfo.stakedBalance)) ||
    (active && !isZero(multiplier)) ||
    (!active && isZero(multiplier))
  ) {
    return <></>;
  }

  return (
    <>
      <WithdrawModal
        title="Deposit"
        modalIsOpen={stakePopup}
        setIsOpen={setStakePopup}
        onConfirm={handleStake}
        amount={lpBalance}
        symbol={farm.lpSymbol}
        inputAmount={stakeInput}
        setInputAmount={setStakeInput}
        onMax={() => setStakeInput(lpBalance)}
      />
      <WithdrawModal
        title="Withdraw"
        modalIsOpen={unStakePopup}
        setIsOpen={setUnStakePopup}
        onConfirm={handleUnStake}
        amount={stakedBalance}
        symbol={farm.lpSymbol}
        inputAmount={unStakeInput}
        setInputAmount={setUnStakeInput}
        onMax={() => setUnStakeInput(stakedBalance)}
      />

      <div
        className={`farm ${
          // farm.type === 1 ? "spirit" : farm.type === 2 ? "spooky" : farm.type === 3 ? "waka" : ""
          farm.type === 1
            ? "spirit"
            : farm.type === 2
              ? "spooky"
              : farm.type === 3
                ? "waka"
                : farm.type === 4
                  ? "magic"
                  : "lqdr"
          }`}
      >
        <div className="top">
          {farm.type === 4 ? (
            <div className="icons">
              <img
                className="first"
                src={`/img/svg/token2/MIM.svg`}
                alt="token"
              />
              <img
                className="last"
                src={`/img/svg/token2/fUSDT.svg`}
                alt="token"
              />
              <img
                className="end"
                src={`/img/svg/token2/USDC.svg`}
                alt="token"
              />
            </div>
          ) : (
            <div className="icons">
              <img
                className="first"
                src={`/img/svg/token2/${tokensName[0] === "SPELL" ? "SPELL.png" : tokensName[0] + '.svg'}`}
                alt="token"
              />
              {tokensName.length > 1 && (
                <img
                  className="last"
                  src={`/img/svg/token2/${tokensName[1]}.svg`}
                  alt="token"
                />
              )}
            </div>
          )}
          <div className="info">
            <p className="name">{farm.lpSymbol}</p>
            <p className="multiplier">{multiplier.toString()}x</p>
          </div>
        </div>
        {account && (
          <div className="earn-wrap">
            <div className="harvest">
              <div className="amount">
                <div className="earned-section">
                  <p className="h-title">LQDR Earned</p>
                  <p className="h-number">
                    {isZero(earnings) ? "0" : formatAmount(earnings, 5)}
                  </p>
                  <p className="h-usd">
                    -{lqdrPrice.times(earnings).toFixed(2)}USD
                  </p>
                </div>
                <div className="earned-section">
                  {farm.type === 1 && farm.pid === 0 && (
                    <>
                      <p className="h-title">SPIRIT Earned</p>
                      <p className="h-number">
                        {isZero(secondEarnings)
                          ? "0"
                          : formatAmount(secondEarnings, 5)}
                      </p>
                      <p className="h-usd">
                        -{spiritPrice.times(secondEarnings).toFixed(2)}USD
                      </p>
                    </>
                  )}
                  {((farm.type === 1 && farm.pid === 1) ||
                    (farm.type === 2 && farm.pid === 10)) && (
                      <>
                        <p className="h-title">WFTM Earned</p>
                        <p className="h-number">
                          {isZero(secondEarnings)
                            ? "0"
                            : formatAmount(secondEarnings, 5)}
                        </p>
                        <p className="h-usd">
                          -{ftmPrice.times(secondEarnings).toFixed(2)}USD
                        </p>
                      </>
                    )}
                  {farm.type === 1 && farm.pid === 22 && (
                    <>
                      <p className="h-title">SPELL Earned</p>
                      <p className="h-number">
                        {isZero(secondEarnings)
                          ? "0"
                          : formatAmount(secondEarnings, 5)}
                      </p>
                      <p className="h-usd">
                        -{spellPrice.times(secondEarnings).toFixed(2)}USD
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="h-section">
                <div className="h-button" onClick={handleHarvest}>
                  Harvest
                </div>
              </div>
            </div>
          </div>
        )}

        {account && (
          <div className="action-farm">
            {!requestedApproval || allowance.gt(0) ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {farm.isDisable ? (
                  <div
                    className={`lq-button ${buttonStyle}`}
                    style={{ width: "45%" }}
                  >
                    Stake
                  </div>
                ) : (
                  <div
                    className={`lq-button ${buttonStyle}`}
                    style={{ width: "45%" }}
                    onClick={() => {
                      setStakePopup(true);
                    }}
                  >
                    Stake
                  </div>
                )}
                <div
                  className={`lq-button ${buttonStyle}`}
                  style={{ width: "45%" }}
                  onClick={() => {
                    setUnStakePopup(true);
                  }}
                >
                  Withdraw
                </div>
              </div>
            ) : (
              <div
                className={`lq-button ${buttonStyle}`}
                onClick={handleApprove}
              >
                Approve Pool
              </div>
            )}
          </div>
        )}

        <div className="apr-wrap">
          <p className="apr">
            <span className="a-title">APR in LQDR</span>
            <span>
              {" "}
              {prices &&
                !isZero(totalLiquidityInUsd) &&
                !isNaN(poolWeight)
                ? new BigNumber(
                  lqdrPerBlock
                    .times(poolWeight)
                    .times(prices["LQDR"])
                    .times(31536000)
                    .div(1.18)
                )
                  .div(totalLiquidityInUsd)
                  .times(100)
                  .toFormat(0)
                : "0"}{" "}
              %
            </span>
          </p>
          {farm.type === 1 && farm.pid === 0 && (
            <p className="apr">
              <span className="a-title">APR in Spirit</span>
              <span>
                {prices &&
                  priceQuoteToken !== 0 &&
                  !isZero(lpTotalInQuoteToken) &&
                  rewardPerSecond
                  ? new BigNumber(
                    rewardPerSecond.times(spiritPrice).times(31536000)
                  )
                    .div(totalLiquidityInUsd)
                    .times(100)
                    .toFormat(0)
                  : "0"}{" "}
                %
              </span>
            </p>
          )}
          {farm.type === 1 && farm.pid === 1 && (
            <p className="apr">
              <span className="a-title">APR in wFTM</span>
              <span>
                {prices &&
                  priceQuoteToken !== 0 &&
                  !isZero(lpTotalInQuoteToken) &&
                  rewardPerSecond
                  ? new BigNumber(
                    rewardPerSecond.times(prices["FTM"]).times(31536000)
                  )
                    .div(totalLiquidityInUsd)
                    .times(100)
                    .toFormat(0)
                  : "0"}{" "}
                %
              </span>
            </p>
          )}
          {farm.type === 1 && farm.pid === 22 && (
            <p className="apr">
              <span className="a-title">APR in SPELL</span>
              <span>
                {prices &&
                  priceQuoteToken !== 0 &&
                  !isZero(lpTotalInQuoteToken) &&
                  rewardPerSecond
                  ? new BigNumber(
                    rewardPerSecond.times(prices["SPELL"]).times(31536000)
                  )
                    .div(totalLiquidityInUsd)
                    .times(100)
                    .toFormat(0)
                  : "0"}{" "}
                %
              </span>
            </p>
          )}
          {farm.type === 2 && farm.pid === 10 && (
            <p className="apr">
              <span className="a-title">APR in wFTM</span>
              <span>
                {prices &&
                  priceQuoteToken !== 0 &&
                  !isZero(lpTotalInQuoteToken) &&
                  rewardPerSecond
                  ? new BigNumber(
                    rewardPerSecond.times(prices["FTM"]).times(31536000)
                  )
                    .div(totalLiquidityInUsd)
                    .times(100)
                    .toFormat(0)
                  : "0"}{" "}
                %
              </span>
            </p>
          )}
          {![0, 3, 4].includes(farm.type) && (
            <p className="apr">
              <span className="a-title">Trading Fee APR</span>
              <span>{feeApr} %</span>
            </p>
          )}
        </div>
        <div
          className="details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="d-title">
            <p>Details</p>
            <img
              src={`/img/svg/${showDetails ? "mines" : "plus"}.svg`}
              style={{ marginLeft: "9px" }}
              alt="plus"
            />
          </div>

          <div
            className="d-content"
            style={{ display: showDetails ? "block" : "none" }}
          >
            {account && (
              <div className="item">
                <p> Your Stake</p>
                <p>
                  $
                  {priceQuoteToken && !isZero(totalStaked) && !isZero(stakedBalance)
                    ? totalLiquidityInUsd
                      .div(totalStaked)
                      .times(stakedBalance)
                      .toFormat(1)
                    : 0}
                </p>
                {/* <p>
                  {isZero(stakedBalance)
                    ? 0
                    : new BigNumber(stakedBalance).isLessThan(0.00001)
                      ? "<0.00001"
                      : new BigNumber(stakedBalance).toFormat(5)}{" "}
                  {farm.lpSymbol}
                </p> */}
              </div>
            )}
            <div className="item">
              <p>Total Staked</p>
              <p>{new BigNumber(totalStaked).toFormat(4)}</p>
            </div>
            <div className="item">
              <p>{isTokenOnly ? "LQDR" : "LP"} Price</p>
              <p>
                $
                {!isZero(totalStaked)
                  ? totalLiquidityInUsd
                    .div(totalStaked)
                    .toFormat(2)
                  : 0}{" "}
              </p>
            </div>
            <div className="item">
              <p>TVL</p>
              <p>
                $
                {!priceQuoteToken
                  ? 0
                  : totalLiquidityInUsd.toFormat(0)}{" "}
              </p>
            </div>
          </div>
        </div>

        {!account && <ConnetWallet type={farm.type} />}
        <a
          className="view-ftmscan"
          href={getExplorerAddress(farm.lpAddresses, chainId)}
          target="_blank"
          rel="noreferrer"
        >
          View on FTMScan
          <img
            src="/img/svg/link.svg"
            style={{ marginLeft: "5px" }}
            alt="link"
          />
        </a>
        {farm.liquidity && (
          <a
            className="provide-liquidity"
            href={farm.liquidity}
            target="_blank"
            rel="noreferrer"
          >
            Provide Liquidity
            <img
              src="/img/svg/link.svg"
              style={{ marginLeft: "5px" }}
              alt="link"
            />
          </a>
        )}
      </div>
    </>
  );
};

export default Farm;
