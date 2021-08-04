import React, { useState, useMemo, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useXlqdrApprove } from "../../hooks/useApprove";
import { useLock, useClaim } from "../../hooks/useLock";
import {
  useAllowance,
  useXlqdrInfo,
  useRewardInfo,
  useEpochInfo,
} from "../../hooks/useXlqdrData";
import ConnectWallet from "../../components/Common/ConnetWallet";
import CalcModal from "../../components/Xlqdr/CalcModal";
import useTokenBalance from "../../hooks/useTokenBalance";
import { getLqdrAddress } from "../../utils/addressHelpers";
import DatePicker from "react-datepicker";
import { RadioGroup, Radio } from "react-radio-group";
import "react-datepicker/dist/react-datepicker.css";
import { usePrices } from "../../hooks/usePrices";
import ReactTooltip from "react-tooltip";
import "./Xlqdr.scss";

const minTimeStamp = 86400 * (7 * 2);

const Xlqdr = () => {
  const { account, chainId } = useWeb3React();
  const [lqdrAmount, setLqdrAmount] = useState(new BigNumber(0));
  const [periodLevel, setPeriodLevel] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLQDR, setIsLQDR] = useState(false);

  const { xlqdrBalance, lockedEnd, xlqdrTotalSupply, totalLqdr, lockedLqdr } =
    useXlqdrInfo();
  const { lqdrPerXlqdr, ftmPerXlqdr } = useRewardInfo();
  const { days, hours, mins } = useEpochInfo();
  const minDate = useMemo(() => {
    if (lockedEnd === 0) {
      return new Date(new Date().getTime() + minTimeStamp * 1000);
    } else {
      return new Date(lockedEnd * 1000 + 86400 * 7 * 1000);
    }
  }, [lockedEnd]);
  const maxDate = new Date(
    Math.floor(new Date().getTime() / 86400 / 1000) * 86400 * 1000 +
      3600 * 24 * (365 * 2) * 1000
  );
  const [selectedDate, setSelectedDate] = useState(minDate);
  const unlockTime = useMemo(() => {
    return Math.floor(selectedDate.getTime() / 1000);
  }, [selectedDate]);

  const { onApprove } = useXlqdrApprove();
  const allowance = useAllowance();
  const lqdrBalance = useTokenBalance(getLqdrAddress(chainId));
  const prices = usePrices(0);

  const {
    onCreateLock,
    onIncreaseAmount,
    onIncreaseUnlockTime,
    onWithdraw,
    isLoading,
  } = useLock(lqdrAmount, unlockTime, lockedEnd);
  // const { pendingClaim, onClaim } = useClaim();

  const lockStatus = useMemo(() => {
    if (lockedEnd === 0) {
      return "create";
    } else if (lockedEnd * 1000 > new Date().getTime()) {
      return "increase";
    } else {
      return "withdraw";
    }
  }, [lockedEnd]);

  const ftmApr = useMemo(() => {
    return !!prices
      ? ftmPerXlqdr.times(prices["FTM"]).div(prices["LQDR"]).times(5400)
      : new BigNumber(0);
  }, [ftmPerXlqdr, prices]);

  const lqdrApr = useMemo(() => {
    return lqdrPerXlqdr.times(5400);
  }, [lqdrPerXlqdr]);

  const onExchange = (e) => {
    setLqdrAmount(BigNumber.min(new BigNumber(e.target.value), lqdrBalance));
  };

  useEffect(() => {
    let timestamp = 0;
    if (periodLevel < 0) return;
    switch (periodLevel) {
      case 0:
        timestamp = minTimeStamp;
        break;
      case 1:
        timestamp = 3600 * 24 * (30 * 2);
        break;
      case 2:
        timestamp = 3600 * 24 * 365;
        break;
      case 3:
        timestamp = 3600 * 24 * (365 * 2);
        break;

      default:
        break;
    }
    let period;
    if (lockedEnd === 0) {
      period = new Date().getTime() + timestamp * 1000;
    } else {
      if (periodLevel === 3) {
        period = new Date().getTime() + timestamp * 1000;
      } else {
        period = lockedEnd * 1000 + timestamp * 1000;
      }
    }
    period = new Date(Math.floor(period / 86400 / 1000) * 86400 * 1000);
    setSelectedDate(period.getTime() > maxDate.getTime() ? maxDate : period);
  }, [periodLevel, lockedEnd]);

  return (
    <>
      <div className="xlqdr-wrap">
        <p className="xlqdr-title">xLQDR</p>
        <div className="balance-section">
          <div className="balance-item">
            <div className="balance-label">Your LQDR</div>
            <div className="balance-value">
              {!account
                ? "-"
                : lockedLqdr.toFormat(lockedLqdr.lt(0.001) ? 5 : 3)}
            </div>
          </div>
          <div className="balance-item">
            <div className="balance-label">Your xLQDR</div>
            <div className="balance-value">
              {!account
                ? "-"
                : xlqdrBalance.toFormat(xlqdrBalance.lt(0.001) ? 5 : 3)}
            </div>
          </div>
          <div className="balance-item">
            <div className="balance-label">Total xLQDR</div>
            <div className="balance-value">
              {xlqdrTotalSupply.toFormat(xlqdrTotalSupply.lt(0.001) ? 5 : 3)}
            </div>
          </div>
        </div>
        <div className="balance-bottom">
          <div className="generate-section">
            <div className="generate-header">Generate xLQDR</div>
            {lockStatus === "increase" && (
              <div className="locked-time">
                Your LQDR will be locked until{" "}
                {new Date(lockedEnd * 1000).toISOString().split("T")[0]}
              </div>
            )}
            <div className="input-label">
              <div className="input-label-left">Your Balance</div>
              <div className="input-label-right">
                Balance:{" "}
                {!account
                  ? "-"
                  : lqdrBalance.toFormat(lqdrBalance.lt(0.001) ? 5 : 3)}
              </div>
            </div>
            <div className="input-wrap">
              <input
                type="number"
                placeholder="0.0"
                value={lqdrAmount.toString(10)}
                onChange={(e) => onExchange(e)}
              />
              <div
                className="lq-button navy-button max-btn"
                onClick={() => setLqdrAmount(lqdrBalance)}
              >
                Max
              </div>
            </div>
            {lockStatus === "increase" &&
              (account ? (
                <div className="lock-btn">
                  <div
                    className={`lq-button ${
                      isLoading ? "grey-button" : "blue-button"
                    }`}
                    onClick={() => onIncreaseAmount()}
                  >
                    Increase Amount
                  </div>
                </div>
              ) : (
                <div className="lock-btn">
                  <ConnectWallet />
                </div>
              ))}
            <div className="input-label">
              <div className="input-label-left">Lock until</div>
            </div>
            <div className="input-wrap">
              <DatePicker
                selected={selectedDate}
                dateFormat="yyyy/MM/dd"
                onChange={(date) => {
                  if (periodLevel >= 0) {
                    setPeriodLevel(-1);
                  }
                  if (date.getTime() === selectedDate.getTime()) {
                    return;
                  }
                  setSelectedDate(
                    new Date(
                      Math.floor(date.getTime() / 1000 / 7 / 86400) *
                        7 *
                        86400 *
                        1000
                    )
                  );
                }}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
            <div className="input-label">
              <div className="input-label-left">
                {lockStatus === "increase" ? "Extend" : "Lock"} for
              </div>
            </div>
            <RadioGroup
              className="period-section"
              name="fruit"
              selectedValue={periodLevel}
              onChange={() => {}}
            >
              <div className="radio-item" onClick={() => setPeriodLevel(0)}>
                <Radio value={0} />
                <span>2 weeks</span>
              </div>
              <div className="radio-item" onClick={() => setPeriodLevel(1)}>
                <Radio value={1} />
                <span>2 months</span>
              </div>
              <div className="radio-item" onClick={() => setPeriodLevel(2)}>
                <Radio value={2} />
                <span>1 year</span>
              </div>
              <div className="radio-item" onClick={() => setPeriodLevel(3)}>
                <Radio value={3} />
                <span>2 years</span>
              </div>
            </RadioGroup>
            <div className="bottom-btn">
              {lockStatus === "increase" &&
                (account ? (
                  <>
                    <div
                      className={`lq-button ${
                        isLoading || lockedEnd >= unlockTime
                          ? "grey-button"
                          : "blue-button"
                      }`}
                      onClick={() => onIncreaseUnlockTime()}
                    >
                      Extend Period
                    </div>
                    <div className="max-period">
                      LQDR lock can be 2 years max.
                    </div>
                  </>
                ) : (
                  <ConnectWallet />
                ))}
              {lockStatus === "create" &&
                (account ? (
                  allowance.gt(0) ? (
                    <div
                      className={`lq-button ${
                        isLoading ? "grey-button" : "blue-button"
                      }`}
                      onClick={() => onCreateLock()}
                    >
                      Lock LQDR
                    </div>
                  ) : (
                    <div
                      className="lq-button blue-button"
                      onClick={() => onApprove()}
                    >
                      Approve
                    </div>
                  )
                ) : (
                  <ConnectWallet />
                ))}
              {lockStatus === "withdraw" &&
                (account ? (
                  <div
                    className={`lq-button ${
                      isLoading ? "grey-button" : "blue-button"
                    }`}
                    onClick={() => onWithdraw()}
                  >
                    Withdraw
                  </div>
                ) : (
                  <ConnectWallet />
                ))}

              <div className="xlqdr-total-info">
                <div className="xlqdr-info-item">
                  <span className="xlqdr-item-title">Total Locked LQDR</span>
                  <span className="xlqdr-item-value">
                    {totalLqdr.toFormat(2)}
                  </span>
                </div>
                <div className="xlqdr-info-item">
                  <span className="xlqdr-item-title">
                    Avg. Lock Time (days)
                  </span>
                  <span className="xlqdr-item-value">
                    {totalLqdr.isZero()
                      ? "0.00"
                      : new BigNumber(730)
                          .div(totalLqdr)
                          .times(xlqdrTotalSupply)
                          .toFormat(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="reward-section">
            <div className="reward-left">
              <img
                className="reward-logo"
                src="/img/liquid-home-logo.png"
                alt="logo"
              />
              <div className="reward-desc">
                Once you locked your LQDR and received xLQDR, you’ll be eligible
                to claim rewards from the revenue-sharing vault every week!
              </div>
              <div className="reward-desc">
                80% of the deposit fees will be redistributed to the vault over
                time.
              </div>
              <div className="reward-desc">
                <div className="reward-desc-title">Current epoch ends in:</div>
                <div className="reward-desc-value">
                  {`${days} days, ${hours} hours, ${mins} minutes`}
                </div>
              </div>
            </div>
            <div className="reward-right">
              <div className="header-desc">
                <div className="icons">
                  <img
                    className="first"
                    src={`/img/svg/token2/LQDR.svg`}
                    alt="token"
                  />
                  <img
                    className="last"
                    src={`/img/svg/token2/FTM.svg`}
                    alt="token"
                  />
                </div>
                <div className="revenue-label">Revenue-sharing vault</div>
              </div>
              <div className="reward-claim">
                <div className="claim-label">Next receivable earnings :</div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item">
                      wFTM:{" "}
                      {!account
                        ? "-"
                        : ftmPerXlqdr
                            .times(xlqdrBalance)
                            .toFormat(
                              ftmPerXlqdr.times(xlqdrBalance).lt(0.001) ? 5 : 3
                            )}
                    </div>
                    <div className="claim-value-item">
                      LQDR:{" "}
                      {!account
                        ? "-"
                        : lqdrPerXlqdr
                            .times(xlqdrBalance)
                            .toFormat(
                              lqdrPerXlqdr.times(xlqdrBalance).lt(0.001) ? 5 : 3
                            )}
                    </div>
                  </div>
                  <div className="claim-btn">
                    {/* {account && (
                      <div
                        className={`lq-button ${
                          pendingClaim ||
                          lqdrReward.isZero() ||
                          ftmReward.isZero()
                            ? "grey-button"
                            : "blue-button"
                        }`}
                        onClick={() => {
                          if (lqdrReward.isZero() || ftmReward.isZero()) return;
                          onClaim();
                        }}
                      >
                        {(lqdrReward.isZero() || ftmReward.isZero()) &&
                        !xlqdrBalance.isZero()
                          ? "Claimed"
                          : "Claim"}
                      </div>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="reward-claim">
                <div className="claim-label">Next earnings :</div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item">
                      FTM / xLQDR :{" "}
                      {ftmPerXlqdr.toFormat(ftmPerXlqdr.lt(0.001) ? 5 : 3)}
                    </div>
                    <div className="claim-value-item">
                      LQDR / xLQDR :{" "}
                      {lqdrPerXlqdr.toFormat(lqdrPerXlqdr.lt(0.001) ? 5 : 3)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="reward-claim">
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item apr">
                      <span className="apr-title ftm">APR in FTM</span>
                      <img
                        className="apr-question"
                        src="/img/svg/question.svg"
                        alt="question"
                        data-tip="Assumes 1 xLQDR = 1 LQDR ( i.e 1 LQDR locked for 2 years )"
                      />
                      <span className="apr-value ftm">
                        {`: ${ftmApr.toFormat(2)}%`}
                      </span>
                      <img
                        className="apr-calc"
                        src="/img/svg/calculator.svg"
                        alt="calculator"
                        onClick={() => {
                          setIsLQDR(false);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                    <div className="claim-value-item apr">
                      <span className="apr-title">APR in LQDR</span>
                      <img
                        className="apr-question"
                        src="/img/svg/question.svg"
                        alt="question"
                        data-tip="Assumes 1 xLQDR = 1 LQDR ( i.e 1 LQDR locked for 2 years )"
                      />
                      <span className="apr-value">
                        {`: ${lqdrApr.toFormat(2)}%`}
                      </span>
                      <img
                        className="apr-calc"
                        src="/img/svg/calculator.svg"
                        alt="calculator"
                        onClick={() => {
                          setIsLQDR(true);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip effect="solid" type="info" />
      <CalcModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        lqdrApr={lqdrApr}
        ftmApr={ftmApr}
        isLQDR={isLQDR}
      />
    </>
  );
};

export default Xlqdr;
