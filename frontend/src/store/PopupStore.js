import {makeAutoObservable} from 'mobx'

export default class PopupStore {
    constructor() {
      this._popup = false

 
      
    makeAutoObservable(this)
    }

    setPopup (bool) {
        this._popup = bool
    }

   
    
    get popup () {
        return this._popup
    }
}