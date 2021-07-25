import './Post.scss';
import { useParams, useLocation, matchPath } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {fetchOneDevice} from '../../http/postAPI';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { fetchPost, fetchAllDeviceCategory } from "../../http/postAPI";
import { fetchCategory } from "../../http/categoryAPI";
import share from './../../image/share.svg';
import comment from './../../image/comment.svg';
import like from './../../image/like.svg';
import point from './../../image/point.svg';
import watch_min from '../../image/watch-min.svg';
import comment_min from '../../image/comment-min.svg';
import like_min from '../../image/like-min.svg';
import share_min from '../../image/share-min.svg';
import moment from 'moment';

const Post = observer(() => {
    // let cardViews = (post?.views/1000).toFixed(1)
    const [device, setDevice] = useState([])
    const {id} = useParams()
    const {post} = useContext(Context)
    const {category} = useContext(Context)
    let cardViews = (device.views / 1000).toFixed(1)
    const [fetching, setFetching] = useState(false)
    const[isLoad, setIsLoad] = useState(false)
    const[visib, setVisib] = useState(12)
    const[target, setTarget] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
      
        fetchPost(token).then(data => post.setPosts(data.data))

    }, [])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if(fetching) {
            setIsLoad(true)
            setTimeout(() => {
                fetchPost(token).then(data =>  {
                    post.setPosts(data.data)
                     setVisib(prevState => prevState+ 12)
                })
                .finally(() => {
                    setFetching(false);
                    setIsLoad(false)
                })
            }, 1500)
        }
    }, [fetching, visib])

    // useEffect(() => {
    //     const token = localStorage.getItem("adminToken")
    //     if(target) {
    //         fetchAllDeviceCategory(category.selectedCategory._id, token).then(data => post.setPostSort(data.data))
    //     } else {
    //         fetchPost(token).then(data => post.setPostSort(data.data))
    //     }
    // }, [category.selectedCategory._id, target])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchOneDevice(id, token).then(data => setDevice(data.data))
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHendler)
        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [fetching])

    const scrollHendler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && visib < post.posts.length) {
            setFetching(true)
        }
    }
    
    return(
            <article className="main-article">
            <div className="article-preview__hash">
               <p className='t1'>{device?.category?.name}</p>
                <p>{moment(device.created_at).format("DD MMM, YYYY")}</p>
            </div>
            <h1 className="main-article__title">{device.title}</h1>
            <div className='main-article__button'>
                <nav>
                    <ul className="main-article__button-active">
                        <li className="main-article__button__list">
                        <img className="like-img" src={like} />
                                <span>Like</span>
                            </li>
                        <li className="main-article__button__list comment">
                                <img className="comment-img" src={comment} />
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
                        <li className="article-button__list-two">
                                <img className='article-button__min-img' src={watch_min} />
                                <span>{cardViews + 'K'}</span>
                        </li>
                        <li className="article-button__list-two"><img  src={point}/></li>
                        <li className="article-button__list-two">
                                <img className='article-button__min-img' src={like_min} />
                                <span>999k</span>
                            </li>
                        <li className="article-button__list-two"><img src={point}/></li>
                        <li className="article-button__list-two">
                            <img className='article-button__min-img' src={comment_min} />
                            <span>11400</span>
                            </li>
                        <li className="article-button__list-two"><img src={point}/></li>
                        <li className="article-button__list-two">
                            <img className='article-button__min-img' src={share_min} />
                            <span>11400</span>
                            </li>
                    </ul>
                </nav>
            </div>
            <p className="post-body" dangerouslySetInnerHTML={{__html: device?.body}} />
        </article>
    )
})

export default Post