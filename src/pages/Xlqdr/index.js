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
  const [tokenType, setTokenType] = useState(0);

  const { xlqdrBalance, lockedEnd, xlqdrTotalSupply, totalLqdr, lockedLqdr } =
    useXlqdrInfo();
  const {
    lqdrReward,
    ftmReward,
    booReward,
    spiritReward,
    wakaReward,
    lqdrPerXlqdr,
    ftmPerXlqdr,
    spiritPerXlqdr,
    booPerXlqdr,
    wakaPerXlqdr,
  } = useRewardInfo();
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

  const spiritApr = useMemo(() => {
    return !!prices && prices["LQDR"]
      ? spiritPerXlqdr
        .times(prices["SPIRIT"] || 0)
        .div(prices["LQDR"])
        .times(36500)
      : new BigNumber(0);
  }, [spiritPerXlqdr, prices]);

  const booApr = useMemo(() => {
    return !!prices && prices["LQDR"]
      ? booPerXlqdr
        .times(prices["BOO"] || 0)
        .div(prices["LQDR"])
        .times(36500)
      : new BigNumber(0);
  }, [booPerXlqdr, prices]);

  const wakaApr = useMemo(() => {
    return !!prices && prices["LQDR"]
      ? wakaPerXlqdr
        .times(prices["WAKA"] || 0)
        .div(prices["LQDR"])
        .times(36500)
      : new BigNumber(0);
  }, [wakaPerXlqdr, prices]);

  const lqdrApr = useMemo(() => {
    return lqdrPerXlqdr.times(36500);
  }, [lqdrPerXlqdr]);

  const wftmApr = useMemo(() => {
    return !!prices && prices["LQDR"]
      ? ftmPerXlqdr
        .times(prices["FTM"] || 0)
        .div(prices["LQDR"])
        .times(36500)
      : new BigNumber(0);
  }, [ftmPerXlqdr, prices]);

  const apr = useMemo(() => {
    return tokenType === 0
      ? lqdrApr
      : tokenType === 1
        ? spiritApr
        : tokenType === 2
          ? booApr
          : tokenType === 3
            ? wakaApr
            : wftmApr;
  }, [lqdrApr, spiritApr, booApr, wakaApr, wftmApr, tokenType]);

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
          <div className="balance-row">
            <div className="balance-item">
              <div className="balance-label">Total Locked LQDR</div>
              <div className="balance-value">
                {totalLqdr.toFormat(2)}
              </div>
            </div>
            <div className="balance-item">
              <div className="balance-label">Avg. Lock Time (days)</div>
              <div className="balance-value">
                {totalLqdr.isZero()
                  ? "0.00"
                  : new BigNumber(730)
                    .div(totalLqdr)
                    .times(xlqdrTotalSupply)
                    .toFormat(2)}
              </div>
            </div>
            <div className="balance-item">
              <div className="balance-label">Total xLQDR</div>
              <div className="balance-value">
                {xlqdrTotalSupply.toFormat(xlqdrTotalSupply.lt(0.001) ? 5 : 3)}
              </div>
            </div>
          </div>
          <div className="balance-row">
            <div className="balance-item">
              <div className="balance-label">Your Locked LQDR</div>
              <div className="balance-value">
                {!account
                  ? "-"
                  : lockedLqdr.toFormat(lockedLqdr.lt(0.001) ? 5 : 3)}
              </div>
            </div>
            <div className="balance-item">
              <div className="balance-label">Locked until :</div>
              <div className="balance-value">
                {lockStatus === "increase"
                  ? new Date(lockedEnd * 1000).toISOString().split("T")[0]
                  : "-"}
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
              <div className="input-label-left">Your LQDR</div>
              <div className="input-label-right">
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
                  {allowance.gt(0) ? (
                    <div
                      className={`lq-button ${isLoading ? "grey-button" : "blue-button"
                        }`}
                      onClick={() => onIncreaseAmount()}
                    >
                      Increase Amount
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
              onChange={() => { }}
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
                      className={`lq-button ${isLoading || lockedEnd >= unlockTime
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
                      className={`lq-button ${isLoading ? "grey-button" : "blue-button"
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
                    className={`lq-button ${isLoading ? "grey-button" : "blue-button"
                      }`}
                    onClick={() => onWithdraw()}
                  >
                    Withdraw
                  </div>
                ) : (
                  <ConnectWallet />
                ))}
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
                to claim rewards from the revenue-sharing vault every day!
              </div>
              <div className="reward-desc">
                Yields collected from our strategies will be redistributed to
                the vault over time.
              </div>
              <div className="reward-desc">
                <div className="reward-desc-title">Current epoch ends in:</div>
                <div className="reward-desc-value">
                  {`${hours} hours, ${mins} minutes`}
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
                  <img
                    className="last"
                    src={`/img/svg/token2/BOO.svg`}
                    alt="token"
                  />
                  <img
                    className="last"
                    src={`/img/svg/token2/SPIRIT.svg`}
                    alt="token"
                  />
                  <img
                    className="last"
                    src={`/img/svg/token2/WAKA.svg`}
                    alt="token"
                  />
                </div>
                <div className="revenue-label">Revenue-sharing vault</div>
              </div>
              <div className="reward-claim">
                <div className="claim-label">Claimable earnings :</div>
                <div className="claim-header-section">
                  <div className="claim-value">
                    <div className="claim-value-item">
                      LQDR:{" "}
                      {!account
                        ? "-"
                        : lqdrReward
                          .toFormat(
                            !lqdrReward.isZero() && lqdrReward.lt(0.001) ? 5 : 3
                          )}
                    </div>
                    <div className="claim-value-item">
                      WFTM:{" "}
                      {!account
                        ? "-"
                        : ftmReward
                          .toFormat(
                            !ftmReward.isZero() && ftmReward.lt(0.001) ? 5 : 3
                          )}
                    </div>
                    <div className="claim-value-item">
                      BOO:{" "}
                      {!account
                        ? "-"
                        : booReward
                          .toFormat(
                            !booReward.isZero() && booReward.lt(0.001) ? 5 : 3
                          )}
                    </div>
                    <div className="claim-value-item">
                      SPIRIT:{" "}
                      {!account
                        ? "-"
                        : spiritReward
                          .toFormat(
                            !spiritReward.isZero() && spiritReward.lt(0.001) ? 5 : 3
                          )}
                    </div>
                    <div className="claim-value-item">
                      WAKA:{" "}
                      {!account
                        ? "-"
                        : wakaReward
                          .toFormat(
                            !wakaReward.isZero() && wakaReward.lt(0.001) ? 5 : 3
                          )}
                    </div>
                  </div>
                </div>
                <div className="claim-btn">
                  {account && (
                    <div
                      className={`lq-button ${pendingClaim ||
                        (lqdrReward.isZero() && ftmReward.isZero() && booReward.isZero() && spiritReward.isZero() && wakaReward.isZero())
                        ? "grey-button"
                        : "blue-button"
                        }`}
                      onClick={() => {
                        if (lqdrReward.isZero() && ftmReward.isZero() && booReward.isZero() && spiritReward.isZero() && wakaReward.isZero()) return;
                        onClaim();
                      }}
                    >
                      Claim
                    </div>
                  )}
                </div>
              </div>
              <div className="reward-claim">
                <div className="claim-section">
                  <div className="claim-value">
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
                          setTokenType(0);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item apr">
                      <span className="apr-title">APR in WFTM</span>
                      <img
                        className="apr-question"
                        src="/img/svg/question.svg"
                        alt="question"
                        data-tip="Assumes 1 xLQDR = 1 LQDR ( i.e 1 LQDR locked for 2 years )"
                      />
                      <span className="apr-value">
                        {`: ${wftmApr.toFormat(2)}%`}
                      </span>
                      <img
                        className="apr-calc"
                        src="/img/svg/calculator.svg"
                        alt="calculator"
                        onClick={() => {
                          setTokenType(4);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item apr">
                      <span className="apr-title">APR in BOO</span>
                      <img
                        className="apr-question"
                        src="/img/svg/question.svg"
                        alt="question"
                        data-tip="Assumes 1 xLQDR = 1 LQDR ( i.e 1 LQDR locked for 2 years )"
                      />
                      <span className="apr-value">
                        {`: ${booApr.toFormat(2)}%`}
                      </span>
                      <img
                        className="apr-calc"
                        src="/img/svg/calculator.svg"
                        alt="calculator"
                        onClick={() => {
                          setTokenType(2);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item apr">
                      <span className="apr-title">APR in SPIRIT</span>
                      <img
                        className="apr-question"
                        src="/img/svg/question.svg"
                        alt="question"
                        data-tip="Assumes 1 xLQDR = 1 LQDR ( i.e 1 LQDR locked for 2 years )"
                      />
                      <span className="apr-value">
                        {`: ${spiritApr.toFormat(2)}%`}
                      </span>
                      <img
                        className="apr-calc"
                        src="/img/svg/calculator.svg"
                        alt="calculator"
                        onClick={() => {
                          setTokenType(1);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="claim-section">
                  <div className="claim-value">
                    <div className="claim-value-item apr">
                      <span className="apr-title">APR in WAKA</span>
                      <img
                        className="apr-question"
                        src="/img/svg/question.svg"
                        alt="question"
                        data-tip="Assumes 1 xLQDR = 1 LQDR ( i.e 1 LQDR locked for 2 years )"
                      />
                      <span className="apr-value">
                        {`: ${wakaApr.toFormat(2)}%`}
                      </span>
                      <img
                        className="apr-calc"
                        src="/img/svg/calculator.svg"
                        alt="calculator"
                        onClick={() => {
                          setTokenType(3);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="total-apr">
                  <span className="total-apr-header">Total APR</span>
                  <span className="total-apr-body">
                    {lqdrApr
                      .plus(spiritApr)
                      .plus(booApr)
                      .plus(wakaApr)
                      .plus(wftmApr)
                      .toFormat(2)}
                    %
                  </span>
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
        apr={apr}
        tokenType={tokenType}
      />
    </>
  );
};

export default Xlqdr;
