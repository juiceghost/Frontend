import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { NotificationContainer } from 'react-notifications'
import Farms from './pages/Farms'
import Home2 from './pages/Home2'
import Lottery from './pages/Lottery'
import Navbar from './components/Common/Navbar'
import { RefreshContextProvider } from './context/RefreshContext'
import { NotificationManager } from 'react-notifications'
import { UnsupportedChainIdError } from '@web3-react/core'
import WithdrawModal from './components/Farm/WidthdrawModal'
import { useWeb3React } from '@web3-react/core'
import { addRPC } from './utils/addRPC'
import { useElementSize } from 'use-element-size'
import 'react-notifications/lib/notifications.css'
import './App.scss'

function App() {
  const { account, error } = useWeb3React()
  const [height, setHeight] = useState(0)

  const [imageHeight,] = useState({
    top: 0,
    middle: 0,
    bottom: 0
  })


  const refTop = useElementSize((size, prevSize, elem) => {
    imageHeight.top = (size.width * 253 / 1160)
    // setImageHeight({ ...imageHeight, top: (size.width * 253 / 1160) })
  })

  const refMiddle = useElementSize((size, prevSize, elem) => {
    imageHeight.middle = (size.width * 486 / 1160)
    // setImageHeight({ ...imageHeight, middle: (size.width * 486 / 1160) })
  })

  const refBottom = useElementSize((size, prevSize, elem) => {
    imageHeight.bottom = (size.width * 247 / 1160)
    // setImageHeight({ ...imageHeight, bottom: (size.width * 247 / 1160) })
  })


  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      NotificationManager.error(
        <>
          <p>Please make sure to set the right network (Fantom Network) </p>
          <div style={{ background: "blue", display: "inline-block", borderRadius: "6px", textAlign: "center", padding: "10px 10px", margin: "auto", marginTop: "20px" }} onClick={() => addRPC(account, 250)}>Switch to Fantom</div>
        </>, 'Error'
      )
    }
  }, [error, account])
  const items = []
  // console.log(height);
  console.log(height, imageHeight);
  if (height !== 0 && imageHeight.bottom !== 0 && imageHeight.top !== 0 && imageHeight.middle !== 0) {
    for (let i = 0; i < (height - (imageHeight.top + imageHeight.bottom)) / imageHeight.middle; i++) {
      items.push(<img key={i} src="/img/bg/Waterfall-Middle.svg" alt="top" />)
    }
  }
  return (

    <div className="main">

      <RefreshContextProvider>
        <BrowserRouter>
          <Navbar />
          {/* <Wallets /> */}
          <WithdrawModal />

          <div className="main-container" >
            <div className="bg-waterfall">
              <div className="inner">
                <img src="/img/bg/Waterfall-Top.svg" alt="top" ref={refTop} />
                <img src="/img/bg/Waterfall-Middle.svg" alt="top" ref={refMiddle} />
                {items}
                <img src="/img/bg/Waterfall-Bottom.svg" alt="top" ref={refBottom} />
              </div>
            </div>

            <Switch>
              <Route path="/deposit">
                <Farms heights={
                  setHeight} />
              </Route>
              <Route path="/farms" >
                <Farms setHeight={setHeight} />
              </Route>

              <Route path="/lottery">
                <Lottery />
              </Route>
              <Route path="/">
                <Home2 setHeight={setHeight} />
              </Route>
            </Switch>
          </div >
        </BrowserRouter>
      </RefreshContextProvider>
      <NotificationContainer />

    </div >
  )
}

export default observer(App)
