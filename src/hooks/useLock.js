import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useFeeDistributor, useXLQDR } from "./useContract";
import BigNumber from "bignumber.js";

export const useLock = (amount, unlockTime, lockedEnd) => {
  const { account } = useWeb3React();
  const xlqdrContract = useXLQDR();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateLock = useCallback(async () => {
    try {
      if (!amount || amount.isZero()) return;

      setIsLoading(true);
      const tx = await xlqdrContract.methods
        .create_lock(
          new BigNumber(amount).times(1e18).toString(10),
          unlockTime
        )
        .send({ from: account });
      setIsLoading(false);
      return tx;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  }, [account, xlqdrContract, amount, unlockTime]);

  const onIncreaseAmount = useCallback(async () => {
    try {
      if (!amount || amount.isZero()) return;
      setIsLoading(true);
      const tx = await xlqdrContract.methods
        .increase_amount(new BigNumber(amount).times(1e18).toString(10))
        .send({ from: account });
      setIsLoading(false);
      return tx;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  }, [account, xlqdrContract, amount]);

  const onIncreaseUnlockTime = useCallback(async () => {
    try {
      if (lockedEnd >= unlockTime) return;
      setIsLoading(true);
      const tx = await xlqdrContract.methods
        .increase_unlock_time(unlockTime)
        .send({ from: account });
      setIsLoading(false);
      return tx;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  }, [account, xlqdrContract, unlockTime, lockedEnd]);

  const onWithdraw = useCallback(async () => {
    try {
      setIsLoading(true);
      const tx = await xlqdrContract.methods.withdraw().send({ from: account });
      setIsLoading(false);
      return tx;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  }, [account, xlqdrContract]);

  return {
    isLoading,
    onCreateLock,
    onIncreaseAmount,
    onIncreaseUnlockTime,
    onWithdraw,
  };
};

export const useClaim = () => {
  const { account } = useWeb3React();
  const feeContract = useFeeDistributor();
  const [claimPending, setClaimPending] = useState(false);

  const onClaim = useCallback(async () => {
    try {
      setClaimPending(true);
      const tx = await feeContract.methods.claim(account).send({ from: account });
      setClaimPending(false);
      return tx;
    } catch (e) {
      setClaimPending(false);
      return false;
    }
  }, [account, feeContract]);

  return {
    claimPending,
    onClaim,
  };
};
