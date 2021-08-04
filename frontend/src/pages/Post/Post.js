import './Post.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext, useRef} from 'react';
import {fetchOneDevice} from '../../http/postAPI';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { fetchAllComment } from "../../http/commentApi";
import share from './../../image/share.svg';
import like from './../../image/like.svg';
import point from './../../image/point.svg';
import watch_min from '../../image/watch-min.svg';
import comment_min from '../../image/comment-min.svg';
import like_min from '../../image/like-min.svg';
import share_min from '../../image/share-min.svg';
import moment from 'moment';
import SignUpWeekly from '../../components/SignUpWeekly/SignUpWeekly';
import Comments from '../../components/Comments/Comments'
import commentImg from './../../image/comment.svg';

const Post = observer(() => {
    const [device, setDevice] = useState([])
    const {id} = useParams()
    const {post} = useContext(Context)
    const {user} = useContext(Context)
    const {admin} = useContext(Context)
    const {comment} = useContext(Context)
    let cardViews = (device.views / 1000).toFixed(1)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchOneDevice(id, token).then(data => setDevice(data.data))
    }, [id])

    useEffect(() => {
        // setTimeout(() => {
         const token = localStorage.getItem("adminToken")
         fetchAllComment(id, token).then(data => comment.setAllComments(data.data))
        // }, 20)
    }, [])

    const isLiked = device.likes?.some((like) => like === admin.admin?._id ? admin.admin?._id : user.user._id)
    const cardLikeButtonClassName = `main-article__button__list ${isLiked && 'like'}`

    function hendleLikeClick () {
        if(admin.isAuth || user.isAuth) {
            post.setIsLiked(device, admin.admin?._id ? admin.admin?._id : user.user._id, 1)
        } else {
            user.setOpenAuth(true)
        }
    }

    const com = useRef(null)
    function scrollToMyRef () {
      com.current.scrollIntoView()
    }
 
    return(
            <article className="main-article main-article__post">
                <div className="post-color">
                    <div className="article-preview__hash">
                        <p className='t1'>{device?.category?.name}</p>
                        <p>{moment(device.created_at).format("DD MMM, YYYY")}</p>
                    </div>
                    <h1 className="main-article__title">{device.title}</h1>
                    <div className='main-article__button main-article__button-post'>
                        <nav>
                            <ul className="main-article__button-active">
                                <li onClick={() => hendleLikeClick()} className={cardLikeButtonClassName}>
                                <img className="like-img" src={like} />
                                        <span>Like</span>
                                    </li>
                                <li onClick={() => scrollToMyRef()} className="main-article__button__list comment">
                                        <img className="comment-img" src={commentImg} />
                                        <span>Comment</span>
                                </li>
                                <li className="main-article__button__list shere">
                                        <img className="share-img" src={share} />
                                        <span>Shere</span>
                                </li>
                            </ul>
                        </nav>
                        <nav>
                            <ul className="main-article__button-sum">
                                <li className="article-button__list-two main-article__button_list-two">
                                        <img className='article-button__min-img' src={watch_min} />
                                        <span>{cardViews + 'K'}</span>
                                </li>
                                <li className="article-button__list-two main-article__button_list-two"><img  src={point}/></li>
                                <li className="article-button__list-two main-article__button_list-two">
                                        <img className='article-button__min-img' src={like_min} />
                                        <span>{device.likes?.length}</span>
                                    </li>
                                <li className="article-button__list-two main-article__button_list-two"><img src={point}/></li>
                                <li className="article-button__list-two main-article__button_list-two">
                                    <img className='article-button__min-img' src={comment_min} />
                                    <span>{device.commentCount}</span>
                                    </li>
                                <li className="article-button__list-two main-article__button_list-two"><img src={point}/></li>
                                <li className="article-button__list-two main-article__button_list-two">
                                    <img className='article-button__min-img' src={share_min} />
                                    <span>11400</span>
                                    </li>
                            </ul>
                        </nav>
                    </div>
                    <p className="post-body" dangerouslySetInnerHTML={{__html: device?.body}} />
                    <div className='main-article__button main-article__button-post non-sticky'>
                        <nav>
                            <ul className="main-article__button-active">
                                <li onClick={() => hendleLikeClick()} className={cardLikeButtonClassName}>
                                <img className="like-img" src={like} />
                                        <span>Like</span>
                                    </li>
                                <li onClick={() => scrollToMyRef()} className="main-article__button__list comment">
                                    <img className="comment-img" src={commentImg} />
                                        <span>Comment</span>
                                </li>
                                <li className="main-article__button__list">
                                        <img className="share-img" src={share} />
                                        <span>Shere</span>
                                </li>
                            </ul>
                        </nav>
                        <nav>
                            <ul className="main-article__button-sum">
                                <li className="article-button__list-two main-article__button_list-two">
                                        <img className='article-button__min-img' src={watch_min} />
                                        <span>{cardViews + 'K'}</span>
                                </li>
                                <li className="article-button__list-two main-article__button_list-two"><img  src={point}/></li>
                                <li className="article-button__list-two main-article__button_list-two">
                                        <img className='article-button__min-img' src={like_min} />
                                        <span>{device.likes?.length}</span>
                                    </li>
                                <li className="article-button__list-two main-article__button_list-two"><img src={point}/></li>
                                <li className="article-button__list-two main-article__button_list-two">
                                <img className='article-button__min-img' src={comment_min} />
                                    <span>{device.commentCount}</span>
                                    </li>
                                <li className="article-button__list-two main-article__button_list-two"><img src={point}/></li>
                                <li className="article-button__list-two main-article__button_list-two">
                                    <img className='article-button__min-img' src={share_min} />
                                    <span>11400</span>
                                    </li>
                            </ul>
                        </nav>
                    </div> 
                </div>
            <div ref={com} className="sign-up-weekly__container">
                <SignUpWeekly /> 
            </div>
            <Comments device={device}/>
        </article>
    )
})

export default Post