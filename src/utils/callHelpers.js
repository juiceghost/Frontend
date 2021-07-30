import { ethers } from "ethers";
import { getSushiRouter } from "./contractHelpers";
import { toWei } from "./formatNumber";

export const approve = async (lpContract, contractAddress, account) => {
  return lpContract.methods
    .approve(contractAddress, ethers.constants.MaxUint256.toString())
    .send({ from: account });
};

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, toWei(amount).toFixed())
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, toWei(amount).toFixed())
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, "0")
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const miniStake = async (miniChefContract, pid, amount, account) => {
  return miniChefContract.methods
    .deposit(pid, toWei(amount).toFixed(), account)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const miniUnstake = async (miniChefContract, pid, amount, account) => {
  return miniChefContract.methods
    .withdrawAndHarvest(pid, toWei(amount).toFixed(), account)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const miniHarvest = async (miniChefContract, pid, account) => {
  return miniChefContract.methods
    .harvest(pid, account)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const getSushiAmountsOut = async (
  fromCurrency,
  toCurrency,
  amountIn,
  web3,
  chainId
) => {
  const sushiGetAmountsOut = async (amountIn, path = []) => {
    console.log(amountIn.toString(), path);
    try {
      const amountsOut = await getSushiRouter(web3, chainId)
        .methods.getAmountsOut(amountIn, path)
        .call();
      return amountsOut[amountsOut.length - 1];
    } catch (error) {
      console.log(error);
    }
  };

  return await sushiGetAmountsOut(toWei(amountIn, fromCurrency.decimals), [
    fromCurrency.address,
    toCurrency.address,
  ]);
};

export const buyTickets = async (
  lotteryContract,
  lotteryId,
  ticketAmount,
  ticketNumbers,
  account
) => {
  return lotteryContract.methods
    .batchBuyLottoTicket(lotteryId, ticketAmount, ticketNumbers)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const claimReward = async (
  lotteryContract,
  lotteryId,
  ticketIds,
  account
) => {
  return lotteryContract.methods
    .batchClaimRewards(lotteryId, ticketIds)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const lockLQDR = async (xlqdrContract, amount, unlockTime, account) => {
  return xlqdrContract.methods
    .create_lock(amount, unlockTime)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};
