import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { fetchQuoteTokenPrices } from "../utils/api";
import { useFarms } from "./useFarms";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";

// Prices

export const usePrices = (forceUpdate) => {
  const farms = useFarms();

  return useMemo(() => {
    if (!farms || farms.length === 0) {
      return {
        LQDR: 0,
        FTM: 0,
        WBTC: 0,
        FRAX: 0,
        USDC: 1,
        DAI: 1,
        FUSDT: 1,
        SPIRIT: 0,
      };
    }
    let farm;
    farm = farms.find((f) => f.pid === 17 && f.type === 0);
    const lqdrPrice = farm.tokenPriceVsQuote ? farm.tokenPriceVsQuote.toNumber() : 0;
    farm = farms.find((f) => f.pid === 1 && f.type === 0);
    const ftmPrice = farm.tokenPriceVsQuote ? farm.tokenPriceVsQuote.toNumber() : 0;
    farm = farms.find((f) => f.pid === 5 && f.type === 0);
    const wbtcPrice = farm.tokenPriceVsQuote ? farm.tokenPriceVsQuote.toNumber() : 0;
    farm = farms.find((f) => f.pid === 16 && f.type === 0);
    const fraxPrice = farm.tokenPriceVsQuote ? farm.tokenPriceVsQuote.toNumber() : 0;
    farm = farms.find((f) => f.pid === 1 && f.type === 1);
    const spiritPrice = farm.tokenPriceVsQuote ? farm.tokenPriceVsQuote.toNumber() : 0;
    return {
      LQDR: lqdrPrice,
      FTM: ftmPrice,
      WBTC: wbtcPrice * ftmPrice,
      FRAX: fraxPrice,
      USDC: 1,
      DAI: 1,
      FUSDT: 1,
      SPIRIT: spiritPrice * lqdrPrice,
    }
  }, [farms])
};
