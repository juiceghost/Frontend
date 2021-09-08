import gql from "graphql-tag";

export const PAIR_DAY_DATA_BULK = (pairList) => {
  const yesterday =
    (Math.floor(new Date().getTime() / 86400 / 1000) - 1) * 86400; // EE yesterdays data
  let pairString = "[";
  pairList.slice(0, pairList.length - 1).map((pair) => {
    pairString += `"${pair}",`;
  });
  pairString = pairString + `"${pairList[pairList.length - 1]}"]`;
  const queryString = `
      query days {
        pairDayDatas(first: 30, where: { pairAddress_in: ${pairString}, date: ${yesterday}}) {
            pairAddress
          dailyVolumeUSD
          reserveUSD
        }
      } 
  `;
  return gql(queryString);
};

export const ACCOUNT_MARKET_INFO = gql`
  query accounts($id: ID!) {
    accounts(where: { id: $id }) {
      tokens(first: 10) {
        symbol
        enteredMarket
        sTokenBalance
        totalUnderlyingSupplied
        totalUnderlyingBorrowed
      }
    }
  }
`;
