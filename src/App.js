import { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { observer } from 'mobx-react'
import { NotificationContainer } from 'react-notifications'
import Farms from './pages/Farms'
import Home2 from './pages/Home2'
import Lottery from './pages/Lottery'
import Xlqdr from './pages/Xlqdr'
import Navbar from './components/Common/Navbar'
import { RefreshContextProvider } from './context/RefreshContext'
import { NotificationManager } from 'react-notifications'
import { UnsupportedChainIdError } from '@web3-react/core'
import WithdrawModal from './components/Farm/WidthdrawModal'
import { useWeb3React } from '@web3-react/core'
import { addRPC } from './utils/addRPC'
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
          <WithdrawModal />

          <div className="main-container" >

            <img className="f-water" src="/img/bg/Waterfall-Top.svg" alt="top" />

            <Switch>
              <Route path="/deposit">
                <Farms />
              </Route>
              <Route path="/farms" >
                <Farms />
              </Route>
              <Route path="/lottery" >
                <Lottery />
              </Route>
              <Route path="/xlqdr" >
                <Xlqdr />
              </Route>

              <Route path="/">
                <Home2 />
              </Route>
            </Switch>
            <img style={{ width: "100%" }} src="/img/bg/Waterfall-Bottom.svg" alt="top" />
          </div >
        </BrowserRouter>
      </RefreshContextProvider>
      <NotificationContainer />

    </div >
  )
}

export default App
