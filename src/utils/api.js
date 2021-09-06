import BigNumber from "bignumber.js";
import erc20 from "../config/abi/erc20.json";
import masterchefABI from "../config/abi/masterchef.json";
import minichefABI from "../config/abi/minichef.json";
import rewarderABI from "../config/abi/rewarder.json";
import strategyABI from "../config/abi/strategy.json";
import SushiAbi from "../config/abi/sushi.json";
import multicall from "./multicall";
import {
  getMasterChefAddress,
  getMiniChefAddress,
  getRewarderAddress,
  getSushiAddress,
} from "./addressHelpers";
import farmsConfig from "../config/constants/farms";
import { fromWei, toWei } from "./formatNumber";
import {
  Tokens,
  getSushiRoute,
  getLastRouteName,
} from "../config/constants/tokens";
import contracts from "../config/constants/contracts";

const miniFarms = farmsConfig.filter((farm) => farm.type > 0);
const nonMiniFarms = farmsConfig.filter((farm) => farm.type === 0);

export const fetchFarms = async (web3, chainId = 250) => {
  const MasterChefAddress = getMasterChefAddress(chainId);

  const nonMiniData = await Promise.all(
    nonMiniFarms
      .filter((farm) => farm?.lpAddresses[chainId] !== "")
      .map(async (farmConfig) => {
        const lpAdress = farmConfig.lpAddresses[chainId];
        const calls = [
          // Balance of Reward token in the LP contract
          {
            address: farmConfig.tokenAddresses[chainId],
            name: "balanceOf",
            params: [lpAdress],
          },
          // Balance of quote token on LP contract
          {
            address: farmConfig.quoteTokenAdresses[chainId],
            name: "balanceOf",
            params: [lpAdress],
          },

          // Balance of LP tokens in the master chef contract
          {
            address: farmConfig.isTokenOnly
              ? farmConfig.tokenAddresses[chainId]
              : lpAdress,
            name: "balanceOf",
            params: [MasterChefAddress],
          },
          // Total supply of LP tokens
          {
            address: lpAdress,
            name: "totalSupply",
          },
          // Reward Token decimals
          {
            address: farmConfig.tokenAddresses[chainId],
            name: "decimals",
          },
          // Quote token decimals
          {
            address: farmConfig.quoteTokenAdresses[chainId],
            name: "decimals",
          },
        ];
        // console.log(calls);
        const [
          tokenBalanceLP,
          quoteTokenBlanceLP,
          lpTokenBalanceMC,
          lpTotalSupply,
          tokenDecimals,
          quoteTokenDecimals,
        ] = await multicall(web3, erc20, calls, chainId);

        let tokenAmount;
        let lpTotalInQuoteToken;
        let tokenPriceVsQuote = new BigNumber(1);

        if (farmConfig.isTokenOnly) {
          //TODO Decimals
          tokenAmount = fromWei(lpTokenBalanceMC, tokenDecimals);
          lpTotalInQuoteToken = tokenAmount;
        } else {
          // Ratio in % a LP tokens that are in staking, vs the total number in circulation
          const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(
            new BigNumber(lpTotalSupply)
          );

          // Total value in staking in quote token value
          lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(new BigNumber(2))
            .times(lpTokenRatio);

          // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
          tokenAmount = new BigNumber(tokenBalanceLP)
            .div(new BigNumber(10).pow(tokenDecimals))
            .times(lpTokenRatio);
          const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(lpTokenRatio);

          if (!tokenAmount.isZero()) {
            tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
          } else {
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(
              new BigNumber(tokenBalanceLP)
            );
          }
        }

        const [info, totalAllocPoint, lqdrPerBlock] = await multicall(
          web3,
          masterchefABI,
          [
            {
              address: MasterChefAddress,
              name: "poolInfo",
              params: [farmConfig.pid],
            },
            {
              address: MasterChefAddress,
              name: "totalAllocPoint",
            },
            {
              address: MasterChefAddress,
              name: "lqdrPerBlock",
            },
          ],
          chainId
        );

        const allocPoint = new BigNumber(info.allocPoint._hex);
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint));

        return {
          ...farmConfig,
          totalStaked: fromWei(lpTokenBalanceMC),
          totalSupply: lpTotalSupply,
          tokenAmount: tokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken,
          tokenPriceVsQuote,
          poolWeight: poolWeight.toNumber(),
          multiplierShow: `${allocPoint.toString()}X`,
          multiplier: allocPoint.div(100),
          depositFeeBP: info.depositFeeBP,
          lqdrPerBlock: fromWei(lqdrPerBlock),
        };
      })
  );

  const MiniChefAddress = getMiniChefAddress(chainId);

  const miniData = await Promise.all(
    miniFarms
      .filter((farm) => farm?.lpAddresses[chainId] !== "")
      .map(async (farmConfig) => {

        const [info, totalAllocPoint, /* lqdrPerBlock, */ strategy] = await multicall(
          web3,
          minichefABI,
          [
            {
              address: MiniChefAddress,
              name: "poolInfo",
              params: [farmConfig.pid],
            },
            {
              address: MiniChefAddress,
              name: "totalAllocPoint",
            },
            // {
            //   address: MiniChefAddress,
            //   name: "lqdrPerBlock",
            // },
            {
              address: MiniChefAddress,
              name: "strategies",
              params: [farmConfig.pid],
            },
          ],
          chainId
        );
        const lqdrPerBlock = 140000000000000000;
        let sBal = 0;
        if (strategy[0] !== "0x0000000000000000000000000000000000000000") {
          const [resBal] = await multicall(
            web3,
            strategyABI,
            [
              {
                address: strategy[0],
                name: "balanceOf",
              },
            ],
            chainId
          );
          sBal = resBal;
        }
        const lpAdress = farmConfig.lpAddresses[chainId];
        const calls = [
          // Balance of Reward token in the LP contract
          {
            address: farmConfig.tokenAddresses[chainId],
            name: "balanceOf",
            params: [lpAdress],
          },
          // Balance of quote token on LP contract
          {
            address: farmConfig.quoteTokenAdresses[chainId],
            name: "balanceOf",
            params: [lpAdress],
          },

          // Balance of LP tokens in the master chef contract
          {
            address: lpAdress,
            name: "balanceOf",
            params: [MiniChefAddress],
          },
          // Total supply of LP tokens
          {
            address: lpAdress,
            name: "totalSupply",
          },
          // Reward Token decimals
          {
            address: farmConfig.tokenAddresses[chainId],
            name: "decimals",
          },
          // Quote token decimals
          {
            address: farmConfig.quoteTokenAdresses[chainId],
            name: "decimals",
          },
        ];
        // console.log(calls);
        const [
          tokenBalanceLP,
          quoteTokenBlanceLP,
          lpTokenBalanceMC,
          lpTotalSupply,
          tokenDecimals,
          quoteTokenDecimals,
        ] = await multicall(web3, erc20, calls, chainId);

        let tokenAmount;
        let lpTotalInQuoteToken;
        let tokenPriceVsQuote = new BigNumber(1);

        if (farmConfig.isTokenOnly) {
          //TODO Decimals
          tokenAmount = fromWei(lpTokenBalanceMC, tokenDecimals);
          lpTotalInQuoteToken = tokenAmount;
        } else {
          // Ratio in % a LP tokens that are in staking, vs the total number in circulation
          const lpTokenRatio = new BigNumber(lpTokenBalanceMC).plus(sBal).div(
            new BigNumber(lpTotalSupply)
          );

          // Total value in staking in quote token value
          lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(new BigNumber(2))
            .times(lpTokenRatio);

          // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
          tokenAmount = new BigNumber(tokenBalanceLP)
            .div(new BigNumber(10).pow(tokenDecimals))
            .times(lpTokenRatio);
          const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(lpTokenRatio);

          if (tokenAmount.comparedTo(0) > 0) {
            tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
          } else {
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(
              new BigNumber(tokenBalanceLP)
            );
          }
        }

        const [rewardPerSecond] = await multicall(
          web3,
          rewarderABI,
          [
            {
              address: getRewarderAddress(),
              name: "tokenPerBlock",
            },
          ],
          chainId
        );

        const allocPoint = new BigNumber(info.allocPoint._hex);
        const poolWeight = allocPoint.isZero()
          ? new BigNumber(farmConfig.alloc).div(108)
          : allocPoint.div(new BigNumber(totalAllocPoint));

        return {
          ...farmConfig,
          totalStaked: fromWei(new BigNumber(lpTokenBalanceMC).plus(sBal)),
          totalSupply: lpTotalSupply,
          tokenAmount: tokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken,
          tokenPriceVsQuote,
          poolWeight: poolWeight.toNumber(),
          multiplierShow: `${
            allocPoint.isZero()
              ? farmConfig.alloc
              : allocPoint.div(100).toString()
          }X`,
          multiplier: allocPoint.div(100),
          depositFeeBP: info.depositFee,
          lqdrPerBlock: fromWei(lqdrPerBlock),
          rewardPerSecond: fromWei(rewardPerSecond),
        };
      })
  );
  return [...nonMiniData, ...miniData];
};

export const fetchQuoteTokenPrices = async (web3, chainId = 250) => {
  const SushiAddress = getSushiAddress(chainId);
  const tokens = ["FTM", "WBTC", "FXS", "USDC", "FRAX", "LQDR"];
  const smallAmount = 0.001;
  const calls = tokens
    .filter((token) => Tokens[token][chainId] !== "")
    .map((token) => {
      return {
        address: SushiAddress,
        name: "getAmountsOut",
        params: [
          toWei(smallAmount, Tokens[token].decimals).toFixed(),
          getSushiRoute(token, chainId),
        ],
      };
    });
  // console.log(calls);
  const data = await Promise.all([
    await multicall(web3, SushiAbi, calls, chainId),
  ]);

  const priceMap = {};
  for (let index = 0; index < data[0].length; index++) {
    const out = data[0][index];
    const amount = new BigNumber(
      out.amounts[out.amounts.length - 1].toString()
    );
    priceMap[tokens[index]] = fromWei(
      amount,
      Tokens[getLastRouteName(tokens[index])].decimals
    )
      .div(smallAmount)
      .toNumber();
  }
  return priceMap;
};

export const fechLqdr = async (web3, chainId = 250) => {
  const BurnerContract = contracts.Burner[chainId];
  const LotteryLockedContract = contracts.LotteryLocked[chainId];
  const lqdrContractAddress = Tokens.LQDR.address[chainId];
  const calls = [
    {
      address: lqdrContractAddress,
      name: "balanceOf",
      params: [BurnerContract],
    },
    {
      address: lqdrContractAddress,
      name: "totalSupply",
    },
    {
      address: lqdrContractAddress,
      name: "balanceOf",
      params: [LotteryLockedContract],
    },
  ];
  const [burnerAmounts, totalSupply, lotteryLocked] = await multicall(
    web3,
    erc20,
    calls,
    chainId
  );

  return {
    burnerAmounts: fromWei(burnerAmounts, 18),
    lotteryLocked: fromWei(lotteryLocked, 18),
    totalSupply: fromWei(totalSupply, 18),
    circulating: fromWei(totalSupply, 18).minus(fromWei(burnerAmounts, 18)),
  };
};
