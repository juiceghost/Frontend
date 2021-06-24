import React, { useState, useMemo, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useXlqdrApprove } from "../hooks/useApprove";
import { useLock, useClaim } from "../hooks/useLock";
import {
  useAllowance,
  useXlqdrInfo,
  useRewardInfo,
  useEpochInfo,
} from "../hooks/useXlqdrData";
import ConnectWallet from "../components/Common/ConnetWallet";
import useTokenBalance from "../hooks/useTokenBalance";
import { getLqdrAddress } from "../utils/addressHelpers";
import DatePicker from "react-datepicker";
import { RadioGroup, Radio } from "react-radio-group";
import "react-datepicker/dist/react-datepicker.css";
import "./Xlqdr.scss";
import { usePrices } from "../hooks/usePrices";

const minTimeStamp = 86400 * (7 * 2);

const Xlqdr = () => {
  const { account, chainId } = useWeb3React();
  const [lqdrAmount, setLqdrAmount] = useState(new BigNumber(0));
  const [periodLevel, setPeriodLevel] = useState(0);
  const { xlqdrBalance, lockedEnd, xlqdrTotalSupply } = useXlqdrInfo();
  const { lqdrPerXlqdr, ftmPerXlqdr, lqdrReward, ftmReward } = useRewardInfo();
  const { days, hours, mins } = useEpochInfo();
  const minDate = useMemo(() => {
    if (lockedEnd === 0) {
      return new Date(new Date().getTime() + minTimeStamp * 1000);
    } else {
      return new Date(lockedEnd * 1000 + 86400 * 7 * 1000);
    }
  }, [lockedEnd]);
  const maxDate = new Date(new Date().getTime() + 3600 * 24 * (365 * 2) * 1000);
  const [selectedDate, setSelectedDate] = useState(minDate);
  const unlockTime = useMemo(() => {
    return Math.ceil((selectedDate.getTime() - new Date().getTime()) / 1000);
  }, [selectedDate]);

  const { onApprove } = useXlqdrApprove();
  const allowance = useAllowance();
  const lqdrBalance = useTokenBalance(getLqdrAddress(chainId));
  const prices = usePrices(0);
  console.log("prices :>> ", prices);

  const {
    onCreateLock,
    onIncreaseAmount,
    onIncreaseUnlockTime,
    onWithdraw,
    isLoading,
  } = useLock(lqdrAmount, unlockTime, lockedEnd);
  const { pendingClaim, onClaim } = useClaim();

  const lockStatus = useMemo(() => {
    if (lockedEnd === 0) {
      return "create";
    } else if (lockedEnd * 1000 > new Date().getTime()) {
      return "increase";
    } else {
      return "withdraw";
    }
  }, [lockedEnd]);

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
    if (lockedEnd === 0) {
      setSelectedDate(new Date(new Date().getTime() + timestamp * 1000));
    } else {
      if (periodLevel === 3) {
        setSelectedDate(new Date(new Date().getTime() + timestamp * 1000));
      } else {
        setSelectedDate(new Date(lockedEnd * 1000 + timestamp * 1000));
      }
    }
  }, [periodLevel, lockedEnd]);

  return (
    <>
      <div className="xlqdr-wrap">
        <p className="xlqdr-title">xLQDR</p>
        <div className="balance-section">
          <div className="balance-item">
            <div className="balance-label">Your LQDR</div>
            <div className="balance-value">
              {lqdrBalance.toFormat(lqdrBalance.lt(0.001) ? 5 : 3)}
            </div>
          </div>
          <div className="balance-item">
            <div className="balance-label">Your xLQDR</div>
            <div className="balance-value">
              {xlqdrBalance.toFormat(xlqdrBalance.lt(0.001) ? 5 : 3)}
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
                Balance: {lqdrBalance.toFormat(lqdrBalance.lt(0.001) ? 5 : 3)}
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
            {lockStatus === "increase" &&
              (account ? (
                <div className="lock-btn">
                  <div
                    className={`lq-button ${
                      isLoading ? "grey-button" : "blue-button"
                    }`}
                    onClick={() => onIncreaseUnlockTime()}
                  >
                    Extend Period
                  </div>
                </div>
              ) : (
                <div className="lock-btn">
                  <ConnectWallet />
                </div>
              ))}
            {lockStatus === "create" &&
              (account ? (
                <div className="bottom-btn">
                  {allowance.gt(0) ? (
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
                  )}
                </div>
              ) : (
                <div className="bottom-btn">
                  <ConnectWallet />
                </div>
              ))}
            {lockStatus === "withdraw" &&
              (account ? (
                <div className="bottom-btn">
                  <div
                    className={`lq-button ${
                      isLoading ? "grey-button" : "blue-button"
                    }`}
                    onClick={() => onWithdraw()}
                  >
                    Withdraw
                  </div>
                </div>
              ) : (
                <div className="bottom-btn">
                  <ConnectWallet />
                </div>
              ))}
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
                <div className="claim-label">Current claimable earnings :</div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item">
                      {ftmReward.toFormat(ftmReward.lt(0.001) ? 5 : 3)} wFTM
                    </div>
                    <div className="claim-value-item">
                      {lqdrReward.toFormat(lqdrReward.lt(0.001) ? 5 : 3)} LQDR
                    </div>
                  </div>
                  <div className="claim-btn">
                    {account && (
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
                    )}
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
                    <div className="claim-value-item">
                      {`APR in FTM : ${
                        !!prices
                          ? ftmPerXlqdr
                              .times(prices["FTM"])
                              .div(prices["LQDR"])
                              .times(5400)
                              .toFormat(2)
                          : "0.00"
                      }%`}
                    </div>
                    <div className="claim-value-item">
                      {`APR in LQDR : ${
                        !!prices ? lqdrPerXlqdr.times(5400).toFormat(2) : "0.00"
                      }%`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Xlqdr;
