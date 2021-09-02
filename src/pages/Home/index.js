import { isZero } from "../../config/constants/numbers";
import { usePrices } from "../../hooks/usePrices";
import { useLqdr } from "../../hooks/useLqdr";
import { useTotalValue } from "../../utils/fetchFarmUser";
import { Link } from "react-router-dom";
import { useXlqdrInfo } from "../../hooks/useXlqdrData";

import "./Home.scss";

function Home2() {
  const tvl = useTotalValue();
  const prices = usePrices();
  const market = useLqdr();
  const { totalLqdr } = useXlqdrInfo();
  return (
    <>
      <div className="home2-wrap">
        <img
          className="liquid-home-logo"
          src="/img/liquid-home-logo.png"
          alt="logo"
        />
        <div className="main-title">
          On-Demand Liquidity as a service on Fantom Opera
        </div>
        <div className="tvl-title">Total Value Locked</div>
        <div className="tvl-amount">
          {isZero(tvl) ? "N/A" : `$${tvl.toFormat(0)}`}
        </div>
        <Link to="/farms" className="lq-button  blue-button btn-wrap ">
          Launch Liquid Driver
        </Link>
        <div className="markets">
          <div className="market">
            <p className="m-title">Market Cap</p>
            <div className="border"></div>
            <p className="amount">
              {" "}
              {(prices &&
                market &&
                "$" +
                  market["circulating"].times(prices["LQDR"]).toFormat(0)) ||
                "N/A"}
            </p>
          </div>
          <div className="market">
            <p className="m-title">LQDR</p>
            <div className="border"></div>
            <p className="amount">
              {(prices && "$" + prices["LQDR"].toFixed(3)) || "N/A"}
            </p>
          </div>
          <div className="market">
            <p className="m-title">Circulating Supply</p>
            <div className="border"></div>
            <p className="amount">
              {(market && market["circulating"].toFormat(0)) || "N/A"}
            </p>
          </div>
          <div className="market">
            <p className="m-title">Total Burned</p>
            <div className="border"></div>
            <p className="amount">
              {(market &&
                market["burnerAmounts"]
                  .plus(market["lotteryLocked"])
                  .toFormat(0)) ||
                "N/A"}
            </p>
          </div>
          <div className="market">
            <p className="m-title">Total Locked LQDR</p>
            <div className="border"></div>
            <p className="amount">
              {(totalLqdr && totalLqdr.toFormat(0)) || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home2;
