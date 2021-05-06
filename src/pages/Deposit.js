import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { fetchFarms } from '../api'
import useWeb3 from '../hooks/useWeb3'
import Farm from '../components/Farm'
import './Deposit.scss'

const deposits = [0, 1]

function DepositPage() {

  const web3 = useWeb3()

  // useEffect(() => {
  //   const getPools = async () => {
  //     try {
  //       const farms = await fetchFarms(web3)
  //       console.info('Farms fetched:', farms)
  //     } catch (e) {
  //       console.error("Farms fetched had error", e)
  //     }
  //   }
  //   if (web3) {
  //     getPools()
  //   }
  // }, [web3])

  return (
    <div className="deposit">
      <div className="d-flex flex-column">
        <div className="text-center d-flex flex-column w-100 justify-content-center align-items-center text-white top-view">
          <img
            src={`${process.env.PUBLIC_URL}/img/top_bg.jpg`}
            className="w-100 position-absolute top-img"
          />
          <h2 className="font-weight-extra-bold">LIQUID CONTAINERS</h2>
          <p className="pt-2 pb-4">Stake SUSHI LP Tokens, Earn LQDR</p>
          <button className="font-weight-bold btn btn-primary rounded-2 px-5 used-bt">
            Deposit Fee will be used to buy back LQDR and burn it.
          </button>
          <div className="d-flex flex-row p-4">
            <div className="custom-control custom-switch mx-4">
              <input
                type="checkbox"
                className="custom-control-input"
                id="stake"
                readOnly
              />
              <label className="custom-control-label" htmlFor="stake">
                Stacked Only
              </label>
            </div>

            <div className="custom-control custom-switch mx-4">
              <input
                type="checkbox"
                className="custom-control-input"
                id="active"
                readOnly
              />
              <label className="custom-control-label" htmlFor="active">
                Active
              </label>
            </div>
          </div>
        </div>
        <div className="pools w-100 my-5 px-4">
          <div className="row p-0 cell-row">
            {deposits.map((deposit, key) => (
              <Farm key={key} pid={deposit} />
            ))}
          </div>
        </div>
        <div style={{ height: '64px' }}></div>
      </div>

    </div>
  )
}

export default observer(DepositPage)
