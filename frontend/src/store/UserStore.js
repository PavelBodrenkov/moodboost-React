import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._openAuth = false
        this._error = ''
        makeAutoObservable(this)
    }

    setUserError (message) {
        this._error = message
    }
    setOpenAuth (bool) {
        this._openAuth = bool
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth () {
        return this._isAuth
    }

    get user () {
        return this._user
    }

    get openAuth () {
        return this._openAuth
    }

    get userError() {
        return this._error
    }
}