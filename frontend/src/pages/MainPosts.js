import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react"
import { Context } from "../index";
import { fetchPost, fetchApiEmil } from "../http/postAPI";
import { fetchCategory } from "../http/categoryAPI";
import Aside from './../components/Aside/Aside';
import Main from '../components/Main/Main';

const MainPosts = observer(() => {

    const {post} = useContext(Context)
    const {category} = useContext(Context)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
        fetchPost(token).then(data => post.setPosts(data.data))
        fetchApiEmil().then(data => post.setGetEmilApi(data.data.articles))
    }, [])

    return(
        <div id="app_moodboost" className="container">
            <Aside />
            <Main  man={post.posts}/>
        </div>
    )

})

export default MainPosts