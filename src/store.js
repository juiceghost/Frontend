import { makeAutoObservable } from 'mobx'

class Store {
  show_connect = false
  show_amount_popup = false
  constructor() {
    makeAutoObservable(this)
  }

  showConnectPopup() {
    this.show_connect = true
  }
  hideConnectPopup() {
    this.show_connect = false
  }

  showAmountPopup() {
    this.show_amount_popup = true
  }

  hideAmountPopup() {
    this.show_amount_popup = false
  }
}

const store = new Store()

export default store
