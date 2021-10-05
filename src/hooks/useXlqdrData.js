import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useRefresh from "./useRefresh";
import {
  useERC20,
  useXLQDR,
} from "./useContract";
import {
  getLqdrAddress,
  getXLqdrAddress,
} from "../utils/addressHelpers";
import useWeb3 from "./useWeb3";
import { ethers } from "ethers";
import feeABI from "../config/abi/feeDistributor.json";
import { getFeeDistributorAddress } from "../utils/addressHelpers";
import { getDailyRewardAmount } from "../utils/api";

export const useAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const lqdrContract = useERC20(getLqdrAddress(chainId));
  const xlqdrAddress = getXLqdrAddress(chainId);

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await lqdrContract.methods
        .allowance(account, xlqdrAddress)
        .call();
      setAllowance(new BigNumber(res));
    };
    if (account && lqdrContract && xlqdrAddress) {
      fetchAllowance();
    }
  }, [account, lqdrContract, xlqdrAddress, fastRefresh]);

  return allowance;
};

export const useXlqdrInfo = () => {
  const [xlqdrInfo, setXlqdrInfo] = useState({
    xlqdrBalance: new BigNumber(0),
    lockedEnd: 0,
    xlqdrTotalSupply: new BigNumber(0),
    totalLqdr: new BigNumber(0),
    lockedLqdr: new BigNumber(0),
  });

  const web3 = useWeb3();
  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const xlqdrContract = useXLQDR();

  useEffect(() => {
    const getXlqdrInfo = async () => {
      try {
        const [xlqdrTotalSupply, totalLqdr] = await Promise.all([
          xlqdrContract.methods.totalSupply().call(),
          xlqdrContract.methods.supply().call(),
        ]);
        let xlqdrBalance = new BigNumber(0),
          lockedEnd = 0;
        let lockedLqdr = new BigNumber(0);
        if (account) {
          const [xlqdrBalanceRes, { 0: lockedAmount, 1: lockedEndRes }] =
            await Promise.all([
              xlqdrContract.methods.balanceOf(account).call(),
              xlqdrContract.methods.locked(account).call(),
            ]);
          xlqdrBalance = new BigNumber(xlqdrBalanceRes).div(1e18);
          lockedEnd = Number(lockedEndRes);
          lockedLqdr = new BigNumber(lockedAmount).div(1e18);
        }
        setXlqdrInfo({
          xlqdrBalance,
          lockedEnd,
          xlqdrTotalSupply: new BigNumber(xlqdrTotalSupply).div(1e18),
          totalLqdr: new BigNumber(totalLqdr).div(1e18),
          lockedLqdr,
        });
      } catch (e) {
        console.error("fetch xlqdr data had error", e);
      }
    };
    if (web3) {
      getXlqdrInfo();
    }
  }, [web3, chainId, fastRefresh, account, xlqdrContract]);

  return xlqdrInfo;
};

export const useRewardInfo = () => {
  const [rewardInfo, setRewardInfo] = useState({
    lqdrReward: new BigNumber(0),
    ftmReward: new BigNumber(0),
    booReward: new BigNumber(0),
    spiritReward: new BigNumber(0),
    wakaReward: new BigNumber(0),
    lqdrPerXlqdr: new BigNumber(0),
    ftmPerXlqdr: new BigNumber(0),
    spiritPerXlqdr: new BigNumber(0),
    booPerXlqdr: new BigNumber(0),
    wakaPerXlqdr: new BigNumber(0),
  });

  const web3 = useWeb3();
  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const { xlqdrTotalSupply } = useXlqdrInfo();

  useEffect(() => {
    const getUserRewards = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          getFeeDistributorAddress(chainId),
          feeABI,
          signer
        );
        const rewards = await contract.callStatic["claim(address)"](account);
        setRewardInfo({
          ...rewardInfo,
          lqdrReward: new BigNumber(Number(rewards[0])).div(1e18),
          ftmReward: new BigNumber(Number(rewards[1])).div(1e18),
          booReward: new BigNumber(Number(rewards[2])).div(1e18),
          spiritReward: new BigNumber(Number(rewards[3])).div(1e18),
          wakaReward: new BigNumber(Number(rewards[4])).div(1e18),
        });
      } catch (e) {
        console.error("fetch xlqdr data had error", e);
      }
    };

    const getRewardInfo = async () => {
      try {
        const dailyReward = await getDailyRewardAmount();
        const lqdr = 6500;
        let boo = 0;
        let spirit = 0;
        let waka = 0;
        if (dailyReward && dailyReward.success) {
          boo = dailyReward.data.boo;
          spirit = dailyReward.data.spirit;
          waka = dailyReward.data.waka;
        }
        setRewardInfo({
          ...rewardInfo,
          lqdrPerXlqdr: xlqdrTotalSupply.isZero()
            ? new BigNumber(0)
            : new BigNumber(lqdr).div(7).div(xlqdrTotalSupply),
          ftmPerXlqdr: xlqdrTotalSupply.isZero()
            ? new BigNumber(0)
            : new BigNumber(0).div(1e18).div(xlqdrTotalSupply),
          spiritPerXlqdr: xlqdrTotalSupply.isZero()
            ? new BigNumber(0)
            : new BigNumber(spirit).div(1e18).div(xlqdrTotalSupply),
          booPerXlqdr: xlqdrTotalSupply.isZero()
            ? new BigNumber(0)
            : new BigNumber(boo).div(1e18).div(xlqdrTotalSupply),
          wakaPerXlqdr: xlqdrTotalSupply.isZero()
            ? new BigNumber(0)
            : new BigNumber(waka).div(1e18).div(xlqdrTotalSupply),
        });
      } catch (e) {
        console.error("fetch xlqdr data had error", e);
      }
    };
    if (web3) {
      getRewardInfo();
      if (account) {
        getUserRewards();
      } else {
        setRewardInfo({
          ...rewardInfo,
          lqdrReward: new BigNumber(0),
          ftmReward: new BigNumber(0),
          booReward: new BigNumber(0),
          spiritReward: new BigNumber(0),
          wakaReward: new BigNumber(0),
        });
      }
    } else {
      setRewardInfo({
        lqdrReward: new BigNumber(0),
        ftmReward: new BigNumber(0),
        booReward: new BigNumber(0),
        spiritReward: new BigNumber(0),
        wakaReward: new BigNumber(0),
        lqdrPerXlqdr: new BigNumber(0),
        ftmPerXlqdr: new BigNumber(0),
        spiritPerXlqdr: new BigNumber(0),
        booPerXlqdr: new BigNumber(0),
        wakaPerXlqdr: new BigNumber(0),
      });
    }
  }, [
    web3,
    chainId,
    fastRefresh,
    account,
    xlqdrTotalSupply,
  ]);

  return rewardInfo;
};

export const useEpochInfo = () => {
  const [epochInfo, setEpochInfo] = useState({
    days: 0,
    hours: 0,
    mins: 0,
  });
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const curTime = new Date().getTime() / 1000;
    const nextEpoch = Math.ceil(curTime / 86400) * 86400;
    const days = Math.floor((nextEpoch - curTime) / 86400);
    const hours = Math.floor((nextEpoch - curTime - days * 86400) / 3600);
    const mins = Math.floor(
      (nextEpoch - curTime - days * 86400 - hours * 3600) / 60
    );
    setEpochInfo({
      days,
      hours,
      mins,
    });
  }, [fastRefresh]);

  return epochInfo;
};
