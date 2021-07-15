import {makeAutoObservable} from 'mobx'

export default class AdminStore {
    constructor() {
        this._isAuth = false
        this._admin = {}
        this._roles = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setRoles(roles) {
        this._roles = roles
    }

    get isAuth () {
        return this._isAuth
    }

    get admin () {
        return this._admin
    }

    get roles () {
        return this._roles
    }
}