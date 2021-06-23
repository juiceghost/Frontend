import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useRefresh from "./useRefresh";
import {
  useERC20,
  useFeeDistributor,
  useFtmDistributor,
  useXLQDR,
} from "./useContract";
import { getLqdrAddress, getXLqdrAddress } from "../utils/addressHelpers";
import useWeb3 from "./useWeb3";
import { ethers } from "ethers";
import feeABI from "../config/abi/feeDistributor.json";
import { getFeeDistributorAddress } from "../utils/addressHelpers";

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
  });

  const web3 = useWeb3();
  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const xlqdrContract = useXLQDR();

  useEffect(() => {
    const getXlqdrInfo = async () => {
      try {
        const [xlqdrBalance, lockedEnd, xlqdrTotalSupply] = await Promise.all([
          xlqdrContract.methods.balanceOf(account).call(),
          xlqdrContract.methods.locked__end(account).call(),
          xlqdrContract.methods.totalSupply().call(),
        ]);
        setXlqdrInfo({
          xlqdrBalance: new BigNumber(xlqdrBalance).div(1e18),
          lockedEnd: Number(lockedEnd),
          xlqdrTotalSupply: new BigNumber(xlqdrTotalSupply).div(1e18),
        });
      } catch (e) {
        console.error("fetch xlqdr data had error", e);
      }
    };
    if (web3 && account) {
      getXlqdrInfo();
    }
  }, [web3, chainId, fastRefresh, account, xlqdrContract]);

  return xlqdrInfo;
};

export const useRewardInfo = () => {
  const [rewardInfo, setRewardInfo] = useState({
    lqdrReward: new BigNumber(0),
    ftmReward: new BigNumber(0),
    lqdrPerWeek: new BigNumber(0),
    ftmPerWeek: new BigNumber(0),
  });

  const web3 = useWeb3();
  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const feeContract = useFeeDistributor();
  const ftmContract = useFtmDistributor();

  useEffect(() => {
    const getRewardInfo = async () => {
      try {
        const timestamp =
          (Math.floor(new Date().getTime() / 1000 / 7 / 86400) + 0) * 7 * 86400;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          getFeeDistributorAddress(chainId),
          feeABI,
          signer
        );
        const [rewards, lqdrPerWeek, ftmPerWeek] = await Promise.all([
          contract.callStatic["claim(address)"](account),
          feeContract.methods.tokens_per_week(timestamp).call(),
          ftmContract.methods.tokens_per_week(timestamp).call(),
        ]);
        setRewardInfo({
          lqdrReward: new BigNumber(Number(rewards[0])).div(1e18),
          ftmReward: new BigNumber(Number(rewards[1])).div(1e18),
          lqdrPerWeek: new BigNumber(lqdrPerWeek).div(1e18),
          ftmPerWeek: new BigNumber(ftmPerWeek).div(1e18),
        });
      } catch (e) {
        console.error("fetch xlqdr data had error", e);
      }
    };
    if (web3 && account) {
      getRewardInfo();
    }
  }, [web3, chainId, fastRefresh, account, feeContract, ftmContract]);

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
    const nextEpoch = Math.ceil(curTime / 7 / 86400) * 7 * 86400;
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
