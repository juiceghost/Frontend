import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useState } from "react";
import { useApprove } from "../../hooks/useApprove";
import { useStake } from "../../hooks/useStake";
import { useUnStake } from "../../hooks/useUnStake";
import { getExplorerAddress } from "../../utils";
import {
  getMasterChefAddress,
  getMiniChefAddress,
} from "../../utils/addressHelpers";
import BigNumber from "bignumber.js";
import { isZero, ZERO } from "../../config/constants/numbers";
import { getFullDisplayBalance } from "../../utils/formatNumber";
import { QuoteToken } from "../../config/constants/types";
import ConnetWallet from "../Common/ConnetWallet";
import WithdrawModal from "./WidthdrawModal";
import { useHarvest } from "../../hooks/useHarvest";

const Farm = ({ farm, prices, userInfo, forceUpdate, active, stakeOnly }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { account, chainId } = useWeb3React();
  const MasterChefAddress = getMasterChefAddress(chainId);
  const MiniChefAddress = getMiniChefAddress(chainId);
  const [stakePopup, setStakePopup] = useState(false);
  const [unStakePopup, setUnStakePopup] = useState(false);
  const [stakeInput, setStakeInput] = useState(0);
  const [unStakeInput, setUnStakeInput] = useState(0);
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

  const handleUnStake = useCallback(
    async () => {
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
    },
    [onUnStake, forceUpdate]
  );

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

  const priceQuoteToken =
    farm.quoteTokenSymbol === QuoteToken.FUSDT
      ? 1
      : prices[farm.quoteTokenSymbol];
  const {
    lqdrPerBlock,
    rewardPerSecond,
    lpTotalInQuoteToken,
    totalStaked,
    poolWeight,
    isTokenOnly,
    multiplier,
  } = farm;
  const lqdrPrice = new BigNumber(prices["LQDR"]);
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
            : "lqdr"
        }`}
      >
        <div className="top">
          <div className="icons">
            <img
              className="first"
              src={`/img/svg/token2/${tokensName[0]}.svg`}
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
          <div className="info">
            <p className="name">{farm.lpSymbol}</p>
            <p className="multiplier">{farm?.multiplierShow.toLowerCase()}</p>
          </div>
        </div>
        {account && (
          <div className="earn-wrap">
            <div className="harvest">
              <div className="amount">
                <p className="h-title">LQDR Earned</p>
                <p className="h-number">
                  {isZero(earnings) ? "0" : Number(earnings).toFixed(4)}
                </p>
                <p className="h-usd">
                  -{lqdrPrice.times(earnings).toFixed(2)}USD
                </p>
              </div>
              <div className="h-button" onClick={handleHarvest}>
                Harvest
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
                    className={`lq-button ${
                      farm.type === 1
                        ? "spirit-button"
                        : farm.type === 2
                        ? "spooky-button"
                        : farm.type === 3
                        ? "waka-button"
                        : "blue-button"
                    }`}
                    style={{ width: "45%" }}
                  >
                    Stake
                  </div>
                ) : (
                  <div
                    className={`lq-button ${
                      farm.type === 1
                        ? "spirit-button"
                        : farm.type === 2
                        ? "spooky-button"
                        : farm.type === 3
                        ? "waka-button"
                        : "blue-button"
                    }`}
                    style={{ width: "45%" }}
                    onClick={() => {
                      setStakePopup(true);
                    }}
                  >
                    Stake
                  </div>
                )}
                <div
                  className={`lq-button ${
                    farm.type === 1
                      ? "spirit-button"
                      : farm.type === 2
                      ? "spooky-button"
                      : farm.type === 3
                      ? "waka-button"
                      : "blue-button"
                  }`}
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
                className={`lq-button ${
                  farm.type === 1
                    ? "spirit-button"
                    : farm.type === 2
                    ? "spooky-button"
                    : farm.type === 3
                    ? "waka-button"
                    : "blue-button"
                }`}
                onClick={handleApprove}
              >
                Approve Pool
              </div>
            )}
          </div>
        )}

        <div className="apr-wrap">
          <p className="apr">
            <span className="a-title">APR</span>
            <span>
              {" "}
              {prices &&
              priceQuoteToken !== 0 &&
              !isZero(lpTotalInQuoteToken) &&
              !isNaN(poolWeight)
                ? new BigNumber(
                    lqdrPerBlock
                      .times(poolWeight)
                      .times(prices["LQDR"])
                      .times(31536000)
                  )
                    .div(lpTotalInQuoteToken.times(priceQuoteToken))
                    .times(100)
                    .toFormat(0)
                : "0"}{" "}
              %
            </span>
          </p>
          {/* {rewardPerSecond && (
            <p className="apr">
              <span className="a-title">APR2</span>
              <span>
                {" "}
                {prices &&
                priceQuoteToken !== 0 &&
                !isZero(lpTotalInQuoteToken) &&
                rewardPerSecond
                  ? new BigNumber(
                      rewardPerSecond.times(prices["SPIRIT"]).times(31536000)
                    )
                      .div(lpTotalInQuoteToken.times(priceQuoteToken))
                      .times(100)
                      .toFormat(0)
                  : "0"}{" "}
                %
              </span>
            </p>
          )} */}
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
                  {isZero(stakedBalance)
                    ? 0
                    : new BigNumber(stakedBalance).isLessThan(0.00001)
                    ? "<0.00001"
                    : new BigNumber(stakedBalance).toFormat(5)}{" "}
                  {farm.lpSymbol}
                </p>
              </div>
            )}
            <div className="item">
              <p>Total Staked</p>
              <p>{new BigNumber(totalStaked).toFormat(4)}</p>
            </div>
            <div className="item">
              <p>Deposit fee</p>
              <p>{farm?.depositFeeBP / 100}%</p>
            </div>
            <div className="item">
              <p>{isTokenOnly ? "LQDR" : "LP"} Price</p>
              <p>
                $
                {priceQuoteToken && !isZero(totalStaked)
                  ? lpTotalInQuoteToken
                      .times(priceQuoteToken)
                      .div(totalStaked)
                      .toFormat(1)
                  : 0}{" "}
              </p>
            </div>
            <div className="item">
              <p>TVL</p>
              <p>
                $
                {!priceQuoteToken
                  ? 0
                  : lpTotalInQuoteToken.times(priceQuoteToken).toFormat(0)}{" "}
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
      </div>
    </>
  );
};

export default Farm;
