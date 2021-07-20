import {makeAutoObservable} from 'mobx'

export default class Aside {
    constructor() {
        this._isAsideOpen = false
        makeAutoObservable(this)
    }

    setIsAsideOpen() {
        this._isAsideOpen = !this._isAsideOpen
    }


    get isAsideOpen () {
        return this._isAsideOpen
    }
}