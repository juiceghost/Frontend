import { ethers } from 'ethers'
import { getSushiRouter } from './contractHelpers'
import { toWei } from './formatNumber'

export const approve = async (lpContract, contractAddress, account) => {
  return lpContract.methods
    .approve(contractAddress, ethers.constants.MaxUint256.toString())
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, toWei(amount).toFixed())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, toWei(amount).toFixed())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}


export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

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
        .call()
      return amountsOut[amountsOut.length - 1]
    } catch (error) {
      console.log(error);
    }
  }

  return await sushiGetAmountsOut(toWei(amountIn, fromCurrency.decimals), [fromCurrency.address, toCurrency.address])
}