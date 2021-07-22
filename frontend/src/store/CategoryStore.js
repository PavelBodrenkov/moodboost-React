import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
     this._category = []
     this._selectedCategory = {}
     this._EmilCategory = []
     this._appEditCategory = []
     this._selectEdit = false
    this._nameCategory = ''
    this._slugCategory = ''
    this._categoryId = ''
    this._nameParentCategory = ''
    makeAutoObservable(this)
    }

    setNameParentCategory (parent) {
        this._nameParentCategory = parent
    }

    setCategory (category) {
        this._category = category
    }

    setEmilCategory (category) {
        this._EmilCategory = category
    }

    
    setSelectedCategory (category) {
        this._selectedCategory = category
    }

    setSelectEdit (category) {
        this._selectEdit = category
    }

    setAppEditCategory (category) {
        this._appEditCategory = category
    }

    setAddCategory (category) {
        this._category.push(category)
    }

    setNameCategory (name) {
        this._nameCategory = name
    }

    setSlugCategory (slug) {
        this._slugCategory = slug
    }

    setCategoryId (id) {
        this._categoryId = id
    }

    get nameParentCategory () {
        return this._nameParentCategory
    }

    get category () {
        return this._category
    }

    get selectedCategory () {
        return this._selectedCategory
    }
    
    get emilCategory () {
        return this._EmilCategory
    }

    get selectEdit () {
        return this._selectEdit
    }

    get appEditCategory () {
        return this._appEditCategory
    }

    get nameCategory () {
        return this._nameCategory
    }

    get slugCategory () {
        return this._slugCategory
    }

    get categoryId () {
        return this._categoryId
    }
}