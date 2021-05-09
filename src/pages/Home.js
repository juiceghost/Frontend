import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { useTotalValue } from '../fetchFarmUser'
import { isZero } from '../config/constants/numbers'
import './Home.scss'

function HomePage() {
  const history = useHistory()
  const tvl = useTotalValue()
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
      <p className="py-4">Total Value Locked: {isZero(tvl) ? "" : `$${tvl.toFixed(2)}`}</p>
      <a
        className="font-weight-bold btn btn-primary rounded-2 px-4"
        onClick={() => {
          history.push('/deposit')
          // NotificationManager.info(
          //   'Coming soon!',
          //   ' Crazy Yields coming soon !'
          // )
        }}
      >
        Launch LiquidDriver{' '}
      </a>
      <div className="row px-5 pt-4 mt-5 mx-5">
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">MARKET CAP</div>
            <h2 className="pt-2"> N/A</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">LQDR PRICE</div>
            <h2 className="pt-2"> N/A</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">CIRCULATING SUPPLY</div>
            <h2 className="pt-2"> N/A</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tile text-white">
            <div className="small">SUPPLY BURNED</div>
            <h2 className="pt-2"> N/A</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(HomePage)
