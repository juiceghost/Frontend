import { observer } from 'mobx-react'
import { isZero } from '../config/constants/numbers'
import { usePrices } from '../hooks/usePrices'
import { useLqdr } from '../hooks/useLqdr'
import { useTotalValue } from '../utils/fetchFarmUser'
import './Home.scss'

function HomePage() {
  const tvl = useTotalValue()
  const prices = usePrices()
  const market = useLqdr()

  return (
    <div className="home-wrap">
      <p className="main-title">        First Shippers of Deep Liquidity for sushiswap on Fantom Opera</p>
      <p className="py-4">Total Value Locked: {isZero(tvl) ? "" : `$${tvl.toFormat(0)}`}</p>
      <a className="font-weight-bold btn btn-primary rounded-2 px-4" href="/deposit">Launch LiquidDriver</a>
      <div className="market-wrap">
        <div className="item">
          <div className="tile text-white">
            <div className="small">MARKET CAP</div>
            <h2 className="pt-2"> {(prices && market && "$" + market["circulating"].times(prices["LQDR"]).toFormat(0)) || "N/A"}</h2>
          </div>
        </div>
        <div className="item">
          <div className="tile text-white">
            <div className="small">LQDR PRICE</div>
            <h2 className="pt-2"> {(prices && "$" + prices["LQDR"]) || "N/A"}</h2>
          </div>
        </div>
        <div className="item">
          <div className="tile text-white">
            <div className="small">CIRCULATING SUPPLY</div>
            <h2 className="pt-2"> {(market && market["circulating"].toFormat(0)) || "N/A"}</h2>
          </div>
        </div>
        <div className="item">
          <div className="tile text-white">
            <div className="small">TOTAL BURNED</div>
            <h2 className="pt-2">{(market && market["burnerAmounts"].toFormat(0)) || "N/A"}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(HomePage)
