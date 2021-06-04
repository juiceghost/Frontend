import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { NotificationContainer } from 'react-notifications'
import Home from './pages/Home'
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
import { useEffect } from 'react'

import 'react-notifications/lib/notifications.css'
import './App.scss'

function App() {
  const { account, error } = useWeb3React()

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

  return (

    <div className="main">

      <RefreshContextProvider>
        <BrowserRouter>
          <Navbar />
          {/* <Wallets /> */}
          <WithdrawModal />

          <div className="main-container">
            <Switch>
              <Route path="/deposit">
                <Farms />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>

              <Route path="/lottery">
                <Lottery />
              </Route>
              <Route path="/home-old">
                <Home />
              </Route>
              <Route path="/">
                <Home2 />
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
