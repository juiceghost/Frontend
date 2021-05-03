import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { observer } from 'mobx-react'

import store from '../store'
import { fetchFarms } from '../api'
import './Deposit.scss'
import useWeb3 from '../hooks/useWeb3'
import { useWeb3React } from '@web3-react/core'

const deposits = [0]

function DepositPage() {

  const { account } = useWeb3React()
  const web3 = useWeb3()

  useEffect(() => {
    const getPools = async () => {
      try {
        const farms = await fetchFarms(web3, account)
        console.info('Farms fetched:', farms)
      } catch (e) {
        console.error("Farms fetched had error", e)
      }
    }
    if (web3 && account) {
      console.log(account);
      getPools()

    }
  }, [web3, account])

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
            {deposits.map((deposit, index) => (
              <div key={index} className="col-4">
                <div className="deposit-cell">
                  <div className="deposit-cell-header">
                    <div className="white-circle" />
                    <div className="deposit-cell-header-text">SUSHI Pool</div>
                  </div>
                  <div className="deposit-cell-content px-4 py-2">
                    <div className="earn-container">
                      <div>
                        <div className="text-primary small">LQDR Earned</div>
                        <div className="text-white large font-weight-bold">
                          0.00
                        </div>
                        <div className="text-primary smaller">-0.00USD</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="btn btn-secondary">Harvest</div>
                      </div>
                    </div>
                    <div className="btn btn-primary w-100 my-4">
                      Approve Pool
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="text-white">APR:</div>
                      <div className="text-white">350%</div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="text-white">Your Stake:</div>
                      <div className="text-white">0SUSHI</div>
                    </div>

                    <div className="btn btn-primary w-100 my-4">
                      See Details
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="text-white">Total staked:</div>
                      <div className="text-white">100000 SUSHI</div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="text-white">End:</div>
                      <div className="text-white">0SUSHI</div>
                    </div>

                    <div className="my-2">
                      <a className="text-white">
                        <i className="fas fa-clipboard" />
                        <u className="small ml-1 pointer">View on fantomscan</u>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: '64px' }}></div>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="amount-popup "
        show={store.show_amount_popup}
        onHide={() => {
          store.hideAmountPopup()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deposit SUSHI Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-right small">15,000 SUSHI available</div>
          <div>
            <input className="w-100 p-2 my-2" type="number" min="0" />
            <button className="btn btn-secondary btn-sm max-btn">MAX</button>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <button className="btn btn-light border col-6 mr-1">Cancel</button>
            <button className="btn btn-primary border col-6 ml-1">
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default observer(DepositPage)
