import {makeAutoObservable} from 'mobx'
import {fetchAddLikeComment, fetchDeleteLikeComment} from '../http/commentApi'

export default class UserStore {
    constructor() {
    this._allComments = []
    this._comment = {}
    this._addComment = {}
    makeAutoObservable(this)
    }


    // setIsLiked (comment, userId) {
    //     const token = localStorage.getItem("adminToken")
    //     const usertoken = localStorage.getItem("userToken")
    //     const isLiked = comment.likes.some((like) => like === userId)
    //     console.log(isLiked)
    //     const likeRequest = isLiked ? fetchDeleteLikeComment(comment._id, token === null ? usertoken : token) : fetchAddLikeComment(comment._id, token === null ? usertoken : token)
    //     likeRequest.then((newPost) => {
    //         const newPosts = this._allComments.map(item => 
    //             item._id === comment._id ? newPost : item
    //         )
    //         console.log(newPosts)
    //         this._allComments = newPosts
    //     })
    // }

    setAllComments (comment) {
        this._allComments = comment
    }

    setComment (comment) {
        this._allComments.push(comment)
    }

    setAddComment (comment) {
        this._allComments.push(comment)
    }

    get allComments () {
        return this._allComments
    }

    get comment () {
        return this._comment
    }

}