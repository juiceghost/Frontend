import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { NotificationContainer } from 'react-notifications'
import Home from './pages/Home'
import Deposit from './pages/Deposit'
import Home2 from './pages/Home2'
import Lottery from './pages/Lottery'
import Navbar from './components/Navbar'
import Wallets from './components/Wallets'
import { RefreshContextProvider } from './context/RefreshContext'
import 'react-notifications/lib/notifications.css'
import './App.scss'

function App() {
  return (

    <div className="main">

      <Navbar />
      <Wallets />
      <div className="main-container">
        <RefreshContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/deposit">
                <Deposit />
              </Route>

              <Route path="/lottery">
                <Lottery />
              </Route>
              <Route path="/home2">
                <Home2 />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </RefreshContextProvider>
        <NotificationContainer />
      </div >
    </div >
  )
}

export default observer(App)
