import {makeAutoObservable} from 'mobx'

export default class AdminStore {
    constructor() {
        this._isAuth = false
        this._admin = {}
        this._roles = []
        this._adminPostSort = []
        makeAutoObservable(this)
    }

    setAdminPostSort (post) {
        this._adminPostSort = post
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

    setAdmin (data) {
        this._admin = data
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

    get adminPostSort () {
        return this._adminPostSort
    }
}