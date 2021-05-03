import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { NotificationContainer } from 'react-notifications'
import Home from './pages/Home'
import Deposit from './pages/Deposit'
import Navbar from './components/LiquidNavbar'
import Wallets from './components/Wallets'
import 'react-notifications/lib/notifications.css'
import './App.scss'

function App() {
  return (
    <div>
      <Navbar />
      <Wallets />
      <BrowserRouter>
        <Switch>
          <Route path="/deposit">
            <Deposit />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
      <NotificationContainer />
    </div >
  )
}

export default observer(App)
