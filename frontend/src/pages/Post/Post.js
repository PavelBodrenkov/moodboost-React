import './Post.scss';
import { useParams, useLocation, matchPath } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {fetchOneDevice} from '../../http/postAPI';
import Main from './../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { fetchPost } from "../../http/postAPI";
import { fetchCategory } from "../../http/categoryAPI";

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
        <div id="app_moodboost" className="container">
        <Aside/>
        <article className="main-article mb-5">
            <h1 className="main-article__title">{device.title}</h1>
            <div className="article-actions article-actions_lg">
                <button className="article-actions__item article-actions__item_disabled">
                    <i className="icon-eye"></i>
                    <span id="views_html">{cardViews}K</span>
                </button>
            </div>
            <p dangerouslySetInnerHTML={{__html: device?.body}} />
        </article>
         <Main man={post.posts} visib={visib} isLoad={isLoad} visibCategory={category.category}/>
        </div>
    )
})

export default Post