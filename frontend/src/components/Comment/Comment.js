import './Comment.scss';
import moment from 'moment';
import commentLike from './../../image/comment-like.svg';
import commentDisLike from './../../image/comment-dislike.svg';
import React, {useState, useEffect, useContext} from 'react';
import AnswerComments from './Comment'
import {fetchCommentAnswer, fetchAllComment, fetchAddLikeComment, fetchDeleteLikeComment} from './../../http/commentApi'
import { useParams} from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Comment = observer(({comment1, device}) => {

    const [openComment, setOpenComment] = useState(false)
    const [answerText, setAnswerText] = useState('')
    const {id} = useParams()
    const {comment} = useContext(Context)
    const {admin} = useContext(Context)
    const {user} = useContext(Context)
    const[render, setRender] = useState(false)

    useEffect(() => {
        setTimeout(() => {
         const token = localStorage.getItem("adminToken")
         const usertoken = localStorage.getItem("userToken")
         fetchAllComment(id, token === null ? usertoken : token).then(data => comment.setAllComments(data.data))
        }, 20)
    }, [render])

    const isLiked = comment1.likes?.some((like) => like === admin.admin?._id ? admin.admin?._id : user.user._id)
    const cardLikeButtonClassName = `${isLiked && 'comment-like-button'}`

    const isDislaked = comment1.likes?.some((like) => like === admin.admin?._id ? admin.admin?._id : user.user._id)
    const disabledDislike = `${!isDislaked && 'comment-dislike-button'}`

    function hendleSubmitComment (e) {
        e.preventDefault()
        const token = localStorage.getItem("adminToken")
        const usertoken = localStorage.getItem("userToken")
        fetchCommentAnswer(answerText, comment1._id, device._id, token === null ? usertoken : token).then(data => comment.setComment(data.data))
        setRender(!render)
        setOpenComment(false)
        setAnswerText('')
       }

    function likeComment (comment2) {
        const token = localStorage.getItem("adminToken")
        const usertoken = localStorage.getItem("userToken")
        const isLiked = comment2.likes.some((like) => like === admin.admin._id ? admin.admin._id : user.user._id)
        if(admin.isAuth || user.isAuth) {
            const likeRequest = !isLiked && fetchAddLikeComment(comment2._id, token === null ? usertoken : token)
            likeRequest.then((newPost) => {
                const newPosts = comment.allComments.map(item => 
                    item._id === comment2._id ? {...item, likes:newPost.data.likes} : item
                )
                comment.setAllComments(newPosts) 
                setRender(!render)
            })
        } else {
            user.setOpenAuth(true)
        }
    }

    function dislikeComment (comment2) {
        const token = localStorage.getItem("adminToken")
        const usertoken = localStorage.getItem("userToken")
        const isLiked = comment2.likes.some((like) => like === admin.admin?._id ? admin.admin?._id : user.user._id)
        if(admin.isAuth || user.isAuth) {
            const likeRequest = isLiked && fetchDeleteLikeComment(comment2._id, token === null ? usertoken : token)
            likeRequest.then((newPost) => {
                const newPosts = comment.allComments.map(item => 
                    item._id === comment2._id ? {...item, likes:newPost.data.likes} : item
                )
                comment.setAllComments(newPosts) 
                setRender(!render)
            })
        } else {
            user.setOpenAuth(true)
        }
    }

    function openAnswer () {
        if(admin.isAuth || user.isAuth) {
            setOpenComment(true)
        } else {
            user.setOpenAuth(true)
        }
    }

    return(
        <div className="comments__list" key={comment1._id}>
        <div>
            <p className="comments__list_title">{comment1.owner.name}</p>
            <p className="comments__list_date">{moment(comment1.createdAt).format("DD MMM, YYYY, HH:mm")}</p>
        </div>
        <div>
            <p className="comments__list_body">{comment1.body}</p>
            <div className="comments__list_answer">
                <a onClick={() => openAnswer()} className="comments__list_answer-title">Ответить</a>
                <div className="comments__list_like">
                    <p className={disabledDislike}><img onClick={() => dislikeComment(comment1)} src={commentDisLike} /></p>
                    <p className="comments__list_like-title">{comment1.likes.length}</p>
                    <p className={cardLikeButtonClassName}><img onClick={() => likeComment(comment1)} src={commentLike} /></p>
                </div>
            </div>
            {comment1.children && comment1.children.length? 
            comment1.children.map((item) => {
                return(
                    <ul style={{listStyle: "none"}} key={item._id}>
                        <li><AnswerComments comment1={item} device={device} /> </li>
                    </ul>
                    
                )
            })
            : null
            }
            <div className={`${openComment ? 'comment-answer_open' : 'comment-answer'}`}>
                <input onChange={(e) => setAnswerText(e.target.value)} type="text" value={answerText} />
                <div>
                    <button onClick={() => setOpenComment(false)}>Отмена</button>
                    <button onClick={(e) => hendleSubmitComment(e)}>Отправить</button>
                </div>
            </div>
        </div>
    </div>
    )
})

export default Comment