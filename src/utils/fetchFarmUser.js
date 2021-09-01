import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import erc20ABI from "../config/abi/erc20.json";
import masterchefABI from "../config/abi/masterchef.json";
import minichefABI from "../config/abi/minichef.json";
import multicall from "./multicall";
import { getMasterChefAddress, getMiniChefAddress } from "./addressHelpers";
import farmsConfig from "../config/constants/farms";
import { ZERO } from "../config/constants/numbers";
import { useFarms } from "../hooks/useFarms";
import { usePrices } from "../hooks/usePrices";
import { useXlqdrInfo } from "../hooks/useXlqdrData";

const miniFarms = farmsConfig.filter((farm) => farm.type > 0);
const masterFarms = farmsConfig.filter((farm) => farm.type === 0);

export const fetchFarmUserAllowances = async (web3, account, chainId) => {
  // Masterchef Farms
  const masterChefAdress = getMasterChefAddress(chainId);

  const calls = masterFarms.map((farm) => {
    const lpContractAddress = farm.isTokenOnly
      ? farm.tokenAddresses[chainId]
      : farm.lpAddresses[chainId];
    return {
      address: lpContractAddress,
      name: "allowance",
      params: [account, masterChefAdress],
    };
  });

  const rawLpAllowances = await multicall(web3, erc20ABI, calls, chainId);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toFixed(0, BigNumber.ROUND_DOWN);
  });

  // Minichef Farms
  const minichefAddres = getMiniChefAddress(chainId);

  const miniCalls = miniFarms.map((farm) => {
    const lpContractAddress = farm.isTokenOnly
      ? farm.tokenAddresses[chainId]
      : farm.lpAddresses[chainId];
    return {
      address: lpContractAddress,
      name: "allowance",
      params: [account, minichefAddres],
    };
  });

  const miniRawLpAllowances = await multicall(
    web3,
    erc20ABI,
    miniCalls,
    chainId
  );
  const miniParsedLpAllowances = miniRawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toFixed(0, BigNumber.ROUND_DOWN);
  });
  return [...parsedLpAllowances, ...miniParsedLpAllowances];
};

//Todo
export const fetchFarmUserTokenBalances = async (web3, account, chainId) => {
  // MasterChef
  const calls = masterFarms.map((farm) => {
    const lpContractAddress = farm.isTokenOnly
      ? farm.tokenAddresses[chainId]
      : farm.lpAddresses[chainId];
    return {
      address: lpContractAddress,
      name: "balanceOf",
      params: [account],
    };
  });

  const rawTokenBalances = await multicall(web3, erc20ABI, calls, chainId);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toFixed(0, BigNumber.ROUND_DOWN);
  });

  // MiniChef
  const miniCalls = miniFarms.map((farm) => {
    const lpContractAddress = farm.isTokenOnly
      ? farm.tokenAddresses[chainId]
      : farm.lpAddresses[chainId];
    return {
      address: lpContractAddress,
      name: "balanceOf",
      params: [account],
    };
  });

  const miniRawTokenBalances = await multicall(
    web3,
    erc20ABI,
    miniCalls,
    chainId
  );
  const miniRarsedTokenBalances = miniRawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toFixed(0, BigNumber.ROUND_DOWN);
  });
  return [...parsedTokenBalances, ...miniRarsedTokenBalances];
};

export const fetchFarmUserStakedBalances = async (web3, account, chainId) => {
  // Masterchef Farms
  const masterChefAdress = getMasterChefAddress(chainId);

  const calls = masterFarms.map((farm) => {
    return {
      address: masterChefAdress,
      name: "userInfo",
      params: [farm.pid, account],
    };
  });

  const rawStakedBalances = await multicall(
    web3,
    masterchefABI,
    calls,
    chainId
  );
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toFixed(
      0,
      BigNumber.ROUND_DOWN
    );
  });
  // Minichef Farms
  const minichefAdress = getMiniChefAddress(chainId);

  const miniCalls = miniFarms.map((farm) => {
    return {
      address: minichefAdress,
      name: "userInfo",
      params: [farm.pid, account],
    };
  });

  const miniRawStakedBalances = await multicall(
    web3,
    minichefABI,
    miniCalls,
    chainId
  );
  const miniParsedStakedBalances = miniRawStakedBalances.map(
    (stakedBalance) => {
      return new BigNumber(stakedBalance[0]._hex).toFixed(
        0,
        BigNumber.ROUND_DOWN
      );
    }
  );
  return [...parsedStakedBalances, ...miniParsedStakedBalances];
};

export const fetchFarmUserEarnings = async (web3, account, chainId) => {
  // Masterchef
  const masterChefAdress = getMasterChefAddress(chainId);

  const calls = masterFarms.map((farm) => {
    return {
      address: masterChefAdress,
      name: "pendingLqdr",
      params: [farm.pid, account],
    };
  });

  // const rawEarnings = await multicall(web3, masterchefABI, calls, chainId);
  // const parsedEarnings = rawEarnings.map((earnings) => {
  //   return new BigNumber(earnings).toFixed(0, BigNumber.ROUND_DOWN);
  // });

  const parsedEarnings = masterFarms.map(() => {
    return new BigNumber(0).toFixed(0, BigNumber.ROUND_DOWN);
  })

  // Minichef
  const minichefAdress = getMiniChefAddress(chainId);

  const minicalls = miniFarms.map((farm) => {
    return {
      address: minichefAdress,
      name: "pendingLqdr",
      params: [farm.pid, account],
    };
  });

  // const minirawEarnings = await multicall(
  //   web3,
  //   minichefABI,
  //   minicalls,
  //   chainId
  // );
  // const miniparsedEarnings = minirawEarnings.map((earnings) => {
  //   return new BigNumber(earnings).toFixed(0, BigNumber.ROUND_DOWN);
  // });
  const miniparsedEarnings = miniFarms.map(() => {
    return new BigNumber(0).toFixed(0, BigNumber.ROUND_DOWN);
  });
  return [...parsedEarnings, ...miniparsedEarnings];
};

export const fetchFarmUserDataAsync = async (web3, account, chainId) => {
  const [
    userFarmAllowances,
    userFarmTokenBalances,
    userStakedBalances,
    userFarmEarnings,
  ] = await Promise.all([
    fetchFarmUserAllowances(web3, account, chainId),
    fetchFarmUserTokenBalances(web3, account, chainId),
    fetchFarmUserStakedBalances(web3, account, chainId),
    fetchFarmUserEarnings(web3, account, chainId),
  ]);

  const arrayOfUserDataObjects = farmsConfig.map((farm, index) => {
    return {
      pid: farm.pid,
      type: farm.type,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    };
  });
  return arrayOfUserDataObjects;
};

export const useTotalValue = () => {
  const [TVL, setTVL] = useState(ZERO);
  const farms = useFarms();
  const prices = usePrices();
  const { totalLqdr } = useXlqdrInfo();

  useEffect(() => {
    const getTVL = () => {
      let value = ZERO;
      for (let i = 0; i < farms.length; i++) {
        const farm = farms[i];
        if (farm.lpTotalInQuoteToken) {
          let val = farm.lpTotalInQuoteToken.times(
            prices[farm.quoteTokenSymbol]
          );
          if (!isNaN(val)) value = value.plus(val);
        }
      }
      return value.plus(totalLqdr.times(prices["LQDR"]));
    };

    if (farms && prices) {
      setTVL(getTVL());
    }
  }, [farms, prices, totalLqdr]);
  return TVL;
};
