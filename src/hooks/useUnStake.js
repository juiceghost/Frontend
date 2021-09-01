import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
// import { approve } from './callHelper'
import { useMasterChef, useMiniChef } from "./useContract";
import { miniUnstake, unstake } from "../utils/callHelpers";

export const useUnStake = (farm, amount) => {
  const { account } = useWeb3React();
  const masterChefContract = useMasterChef();
  const miniChefContract = useMiniChef();

  const handleUnStake = useCallback(async () => {
    try {
      if (farm.type > 0) {
        const tx = await miniUnstake(miniChefContract, farm.pid, amount, account);
        return tx;
      } else {
        const tx = await unstake(masterChefContract, farm.pid, amount, account);
        return tx;
      }
    } catch (e) {
      return false;
    }
  }, [account, amount, farm, masterChefContract, miniChefContract]);

  return { onUnStake: handleUnStake };
};
