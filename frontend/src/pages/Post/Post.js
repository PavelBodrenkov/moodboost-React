import './Post.scss';
import { useParams } from 'react-router-dom';
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
    const [device, setDevice] = useState({info:[]})
    const {id} = useParams()
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchOneDevice(id, token).then(data => setDevice(data.data))
        window.scrollTo(0, 0)
    }, [id])
    const {post} = useContext(Context)
    const {category} = useContext(Context)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
        fetchPost(token).then(data => post.setPosts(data.data))
    }, [])

    return(
        <div id="app_moodboost" className="container">
        <Aside/>
        <article className="main-article mb-5">
            <h1 className="main-article__title">{device.title}</h1>
            <div className="article-actions article-actions_lg">
                <button className="article-actions__item article-actions__item_disabled">
                    <i className="icon-eye"></i>
                    <span id="views_html">{device.views}</span>
                </button>
            </div>
            <p dangerouslySetInnerHTML={{__html: device?.body}} />
        </article>
        <Main man={post.posts}/>
        </div>
    )
})

export default Post