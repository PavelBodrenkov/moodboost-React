import './Card.scss';
import { useLocation, useHistory } from 'react-router-dom';
import { POST_ROUTE } from '../../utils/consts';
import share from './../../image/share.svg';
import commentImg from './../../image/comment.svg';
import like from './../../image/like.svg';
import point from './../../image/point.svg';
import watch_min from '../../image/watch-min.svg';
import comment_min from '../../image/comment-min.svg';
import like_min from '../../image/like-min.svg';
import share_min from '../../image/share-min.svg';
import { Context } from "../../index";
import React, { useContext, useEffect} from "react"
import moment from 'moment';
import {fetchAllComment} from '../../http/commentApi';
import { observer } from 'mobx-react-lite';

const Card = observer(({card}) => {
    const location = useLocation()
    const history = useHistory()
    let cardViews = (card.views / 1000).toFixed(1)
    const {comment} = useContext(Context)
    const {post} = useContext(Context)
    const {admin} = useContext(Context)
    const {user} = useContext(Context)
   
    //Добавить путь к карточке + урезать все до jpg как в бэкенде
    //card.image.split('.').slice(0, -1).join('.') + "-" + 'cropped' + '.' + card.image.split('.').pop()

  
    const isLiked = card.likes?.some((like) => like === admin.admin?._id ? admin.admin?._id : user.user._id)
    const cardLikeButtonClassName = `article-button__list ${isLiked && 'like'}`

    function hendleLikeClick () {
        if(admin.isAuth || user.isAuth) {
            post.setIsLiked(card, admin.admin._id, 1)
        } else {
            user.setOpenAuth(true)
        }
    }

    console.log(card.views)

    useEffect(() => {
        setTimeout(() => {
         const token = localStorage.getItem("adminToken")
         fetchAllComment(card._id, token).then(data => comment.setAllComments(data.data))
        }, 20)
    }, [])


    return(
        <>
       {card.status === 'Опубликовано' && <article className="article-preview">
            <div className="article-preview__hash">
                <p className='t1'>{card.category.name}</p>
                <p className="article-preview__hash_data">{moment(card.created_at).format("DD MMM, YYYY")}</p>
            </div>
            <h3 className="article-preview__title">{card.title}</h3>       
            <a href={POST_ROUTE + '/' + card._id}>
                <img src={process.env.REACT_APP_API_URL + card.image.split('.').slice(0, -1).join('.') + "-" + 'medium' + '.' + card.image.split('.').pop()} alt="" className="article-preview__photo"/>
            </a>
            <div className="article-actions">
               <p>Stream full seasons of exclusive series, current-season episodes, 
                   hit movies, Hulu Originals, kids shows, and more. 
                   Stream full seasons of exclusive series, current-season episodes, hit movies, Hulu Originals...</p>
            </div>
            <div className='article-button_container'>
                <ul className="article-button">
                    <li onClick={() => hendleLikeClick()} className={cardLikeButtonClassName}>
                        <img className="like-img" src={like} />
                        <span>Like</span>
                    </li>
                    <li className="article-button__list comment">
                        <a href={POST_ROUTE + '/' + card._id}>
                            <img className="comment-img" src={commentImg} />
                            <span>Comment</span>
                        </a> 
                    </li>
                    <li className="article-button__list shere">
                        <img className="share-img" src={share} />
                        <span>Shere</span>
                    </li>
                </ul>
                <ul className="article-button article-button__min">
                    <li className="article-button__list-two">
                            <img className='article-button__min-img' src={watch_min} />
                            <span>{cardViews+ 'K'}</span>
                    </li>
                    <li className="article-button__list-two"><img  src={point}/></li>
                    <li className="article-button__list-two">
                            <img className='article-button__min-img' src={like_min} />
                            <span>{card.likes.length}</span>
                        </li>
                    <li className="article-button__list-two"><img src={point}/></li>
                    <li className="article-button__list-two">
                        <img className='article-button__min-img' src={comment_min} />
                        <span>{card.commentCount}</span>
                        </li>
                    <li className="article-button__list-two"><img src={point}/></li>
                    <li className="article-button__list-two ">
                        <img className='article-button__min-img' src={share_min} />
                        <span>11400</span>
                        </li>
                </ul>
            </div>
       </article>}
       </>
    )
})

export default Card