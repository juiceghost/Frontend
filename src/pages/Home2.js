import { observer } from 'mobx-react'
import './Home2.scss'
import { isZero } from '../config/constants/numbers'
import { usePrices } from '../hooks/usePrices'
import { useLqdr } from '../hooks/useLqdr'
import { useTotalValue } from '../utils/fetchFarmUser'
function Home2() {
    const tvl = useTotalValue()
    const prices = usePrices()
    const market = useLqdr()

    return (<>
        <div className="home2-wrap">
            <img className="liquid-home-logo" src="/img/liquid-home-logo.png" alt="logo" />
            <div className="main-title">
                Incentivizing deep liquidity for SushiSwap on Fantom Opera
            </div>
            <div className="tvl-title">Total Value Locked</div>
            <div className="tvl-amount">{isZero(tvl) ? "" : `$${tvl.toFormat(0)}`}</div>
            <div className="lq-button  blue-button btn-wrap ">
                Launch Liquid Driver
            </div>
            <div className="markets">
                <div className="market">
                    <p className="m-title">Market Cap</p>
                    <div className="border"></div>
                    <p className="amount"> {(prices && market && "$" + market["circulating"].times(prices["LQDR"]).toFormat(0)) || "N/A"}</p>
                </div>
                <div className="market">
                    <p className="m-title">LQDR</p>
                    <div className="border"></div>
                    <p className="amount">{(prices && "$" + prices["LQDR"]) || "N/A"}</p>
                </div>
                <div className="market">
                    <p className="m-title">Circulating Supply</p>
                    <div className="border"></div>
                    <p className="amount">{(market && market["circulating"].toFormat(0)) || "N/A"}</p>
                </div>
                <div className="market">
                    <p className="m-title">Total Burned</p>
                    <div className="border"></div>
                    <p className="amount">{(market && market["burnerAmounts"].toFormat(0)) || "N/A"}</p>
                </div>

            </div>

        </div>
    </>)
}

export default observer(Home2)
