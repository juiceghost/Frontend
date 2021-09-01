import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import {
  getERC20Contract,
  getMasterChefContract,
  getSushiRouter,
  getLotteryContract,
  getXLQDRContract,
  getFeeDistributorContract,
  getFTMDistributorContract,
  getMiniChefContract,
} from "../utils/contractHelpers";
import useWeb3 from "./useWeb3";

export const useERC20 = (address) => {
  const web3 = useWeb3();
  return useMemo(() => {
    if (!isAddress(address)) return null;
    return getERC20Contract(address, web3);
  }, [address, web3]);
};

export const useMasterChef = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getMasterChefContract(web3, chainId), [web3, chainId]);
};

export const useMiniChef = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getMiniChefContract(web3, chainId), [web3, chainId]);
};

export const useSusiRouter = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getSushiRouter(web3, chainId), [web3, chainId]);
};

export const useLottery = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getLotteryContract(web3, chainId), [web3, chainId]);
};

export const useXLQDR = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getXLQDRContract(web3, chainId), [web3, chainId]);
};

export const useFeeDistributor = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getFeeDistributorContract(web3, chainId), [web3, chainId]);
};

export const useFtmDistributor = () => {
  const web3 = useWeb3();
  const { chainId } = useWeb3React();
  return useMemo(() => getFTMDistributorContract(web3, chainId), [web3, chainId]);
};
