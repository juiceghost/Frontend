import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useMasterChef, useMiniChef } from "./useContract";
import { miniHarvest, unstake } from "../utils/callHelpers";

export const useHarvest = (farm) => {
  const { account } = useWeb3React();
  const masterChefContract = useMasterChef();
  const miniChefContract = useMiniChef();

  const handleHarvest = useCallback(async () => {
    try {
      if (farm.type > 0) {
        const tx = await miniHarvest(miniChefContract, farm.pid, account);
        return tx;
      } else {
        const tx = await unstake(masterChefContract, farm.pid, 0, account);
        return tx;
      }
    } catch (e) {
      return false;
    }
  }, [account, farm, masterChefContract, miniChefContract]);

  return { onHarvest: handleHarvest };
};
