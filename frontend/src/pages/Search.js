import React, { useContext, useEffect } from "react"
import Aside from "../components/Aside/Aside"
import SearchForm from "../components/SearchForm/SearchForm"
import Main from "../components/Main/Main"
import { fetchPost } from "../http/postAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Link, BrowserRouter as Router, Route ,Switch, useLocation} from 'react-router-dom';
import { fetchCategory } from "../http/categoryAPI";

const Search = observer(() => {
    const {post} = useContext(Context)
    const {category} = useContext(Context)
    const location = useLocation()

    useEffect(() => {
        fetchCategory().then(data => category.setCategory(data.data))
        fetchPost().then(data => post.setPosts(data.data))
    }, [])

    useEffect(() => {
        if(location.pathname === ('/search')) {
            if(post.searchPost.length > 2) {
             post.setGetSearchPost(post.posts.filter(item => item.body.toLowerCase().includes(post.searchPost.toLowerCase()) || item.title.toLowerCase().includes(post.searchPost.toLowerCase())))
            } 
        }
    }, [post.searchPost, location.pathname])


    return(
        <div id="app_moodboost" className="container">
            <Aside />
            <Main man={post.getSearchPost}/>
        </div>
    )
})

export default Search