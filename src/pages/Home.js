import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { useTotalValue } from '../fetchFarmUser'
import { isZero } from '../config/constants/numbers'
import './Home.scss'
import { usePrices } from '../hooks/usePrices'
import { useLqdr } from '../hooks/useLqdr'

function HomePage() {
  // const history = useHistory()
  const tvl = useTotalValue()
  const prices = usePrices()
  const market = useLqdr()
  if (market)
    console.log(market["totalSupply"].toFixed(0), market["circulating"].toFixed(0));
  return (
    <div className="text-center d-flex flex-column position-fixed w-100 h-100 justify-content-center align-items-center text-white">
      <img
        src={`${process.env.PUBLIC_URL}/img/back.jpg`}
        className="position-fixed w-100 h-100 fixed-top back-img"
      />
      <h2 className="font-weight-extra-bold">
        First Shippers of Deep Liquidity for sushiswap on{' '}
      </h2>
      <h2 className="font-weight-extra-bold">Fantom Opera</h2>
      <p className="py-4">Total Value Locked: {isZero(tvl) ? "" : `$${tvl.toFormat(0)}`}</p>
      <a
        className="font-weight-bold btn btn-primary rounded-2 px-4"
        href="/deposit"
      >
        Launch LiquidDriver{' '}
      </a>
      <div className="row px-5 pt-4 mt-5 mx-5">
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">MARKET CAP</div>
            <h2 className="pt-2"> {prices && market && "$" + market["circulating"].times(prices["LQDR"]).toFormat(0) || "N/A"}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">LQDR PRICE</div>
            <h2 className="pt-2"> {prices && "$" + prices["LQDR"] || "N/A"}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">CIRCULATING SUPPLY</div>
            <h2 className="pt-2"> {market && market["circulating"].toFormat(0) || "N/A"}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">TOTAL BURNED</div>
            <h2 className="pt-2">{market && market["burnerAmounts"].toFormat(0) || "N/A"}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(HomePage)
