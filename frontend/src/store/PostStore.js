import {makeAutoObservable} from 'mobx'
import {fetchDeleteLike, fetchAddLikes} from './../http/postAPI';

export default class PostStore {

    constructor() {
      this._post = []
      this._posts = []
      this._sortPosts = []
      this._searchPost = []
      this._getSearchPost = []
      this._getEmilApi = []
      this._postEdit = false
      this._selectedPost = {}
      this._appEditPost = []
      this._title = ''
      this._categoryId = ''
      this._statusPost = ''
      this._bodyPost = ''
      this._file = null
      this._views = ''
      this._slug = ''
      this._description = ''
      this._keyWord = ''
      this._seoTitle = ''
      this._postCategiry = []
      this._postSort = []
      this._isLiked = false
    makeAutoObservable(this)
    }

    setIsLiked (card, userId, sort) {
        const token = localStorage.getItem("adminToken")
        const usertoken = localStorage.getItem("userToken")
        const isLiked = card.likes.some((like) => like === userId)
        const likeRequest = isLiked ? fetchDeleteLike(card._id, token === null ? usertoken : token) : fetchAddLikes(card._id, token === null ? usertoken : token)
        likeRequest.then((newPost) => {
            const newPosts = this._posts.map(item => 
                item._id === card._id ? {...item, likes:newPost.data.likes} : item
            )
            if(sort == 1) {
                this._postSort = newPosts.sort((a,b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
            }
        })
    
    }
    
    setPostSort (post) {
        this._postSort = post
    }
    setTitle (title) {
        this._title = title
    }
    setCategoryId (categoryId) {
        this._categoryId = categoryId
    }
    setStatusPost (status) {
        this._statusPost = status
    }
    setBodyPost (BodyPost) {
        this._bodyPost = BodyPost
    }
    setFile (file) {
        this._file = file
    }
    setViews (views) {
        this._views = views
    }
    setSlug (slug) {
        this._slug = slug
    }
    setDescription (description) {
        this._description = description
    }
    setKeyWord (keyWord) {
        this._keyWord = keyWord
    }
    setSeoTitle (seoTitle) {
        this._seoTitle = seoTitle
    }

    setPost (post) {
        this._post = post 
    }

    setPosts(posts) {
        this._posts = posts
    }

    setSortPosts(posts) {
        this._sortPosts = posts
    }

    setSearchPost(text) {
        this._searchPost = text
    }

    setGetSearchPost (posts) {
        this._getSearchPost =  posts
    }

    setGetEmilApi (post) {
        this._getEmilApi = post
    }

    setAddPost (post) {
        this._posts.push(post)
    }

    setPostEdit (bool) {
        this._postEdit = bool
    }

    setSelectedPost (post) {
        this._selectedPost = post
    }

    setAppEditPost (post) {
        this._appEditPost = post
    }

    setPostCategory (post) {
        this._postCategiry = post
    }

    get postCategory () {
        return this._postCategiry
    }

    get post () {
        return this._post
    }

    get posts () {
        return this._posts
    }

    get sortPosts () {
        return this._sortPosts
    }

    get searchPost () {
        return this._searchPost
    }

    get getSearchPost () {
        return this._getSearchPost
    }

    get getEmilApi() {
        return this._getEmilApi
    }

    get postEdit () {
        return this._postEdit
    }

    get selectedPost () {
        return this._selectedPost
    }

    get appEditPost () {
        return this._appEditPost
    }

    get title () {
        return this._title 
    }
    get categoryId () {
        return this._categoryId
    }
    get statusPost () {
        return this._statusPost
    }
    get bodyPost () {
        return this._bodyPost
    }
     get file () {
        return this._file
    }
    get views () {
        return this._views
    }
    get slug () {
        return this._slug
    }
    get description () {
        return this._description
    }
    get keyWord () {
        return this._keyWord
    }
    get seoTitle () {
        return this._seoTitle
    }

    get postSort () {
        return this._postSort
    }

    get isLiked () {
        return  this._isLiked
    }
}