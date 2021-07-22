import React, { useContext, useEffect, useState } from "react"
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
    const[visib, setVisib] = useState(12)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
        fetchPost(token).then(data => post.setPosts(data.data))
    }, [])

    useEffect(() => {
        if(location.pathname === ('/search')) {
            if(post.searchPost.length > 2) {
             post.setGetSearchPost(post.posts.filter(item => item.body.toLowerCase().includes(post.searchPost.toLowerCase()) || item.title.toLowerCase().includes(post.searchPost.toLowerCase())))
             if(post.getSearchPost.length === 0) {
                console.log('Ничего не найдено')
            }
            }
            
            if(post.searchPost.length === 0) {
                console.log('Enter a keyword')
            }
        }
    }, [post.searchPost, location.pathname])


    return(
        <div id="app_moodboost" className="container">
            <Aside />
            <Main man={post.getSearchPost} visib={visib}/>
        </div>
    )
})

export default Search