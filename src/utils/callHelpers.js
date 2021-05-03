import { ethers } from 'ethers'
import { toWei } from './formatNumber'

export const approve = async (lpContract, contractAddress, account) => {
  return lpContract.methods
    .approve(contractAddress, ethers.constants.MaxUint256.toString())
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, toWei(amount).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, toWei(amount).toString())
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