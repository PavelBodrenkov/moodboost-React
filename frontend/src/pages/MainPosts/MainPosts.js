import { observer } from "mobx-react-lite";
import './MainPosts.scss';
import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../index";
import { fetchPost, fetchApiEmil } from "../../http/postAPI";
import { fetchCategory, fetchAllDeviceCategory } from "../../http/categoryAPI";
import Aside from '../../components/Aside/Aside';
import Main from '../../components/Main/Main';
import Post from '../Post/Post'

const MainPosts = observer(() => {
    const {post} = useContext(Context)
    const {category} = useContext(Context)
    const[visib, setVisib] = useState(12)
    const [fetching, setFetching] = useState(false)
    const[isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
        fetchApiEmil().then(data => post.setGetEmilApi(data.data.articles))

    }, [])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if(fetching) {
            setIsLoad(true)
            //  setTimeout(() => {
                fetchPost(token).then(data =>  {
                    post.setPosts(data.data)
                    console.log('111')
                     setVisib(prevState => prevState + 12)
                })
                .finally(() => {
                    setFetching(false);
                    setIsLoad(false)
                })
            // }, 1500)
        }
    }, [fetching, visib])
console.log(visib)

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

    console.log(category.selectedCategory._id)


    return(
        <div id="app_moodboost" className="container main-posts">
            <Aside />
            <Main  man={post.posts} visib={visib} isLoad={isLoad} visibCategory={category.category}/>
        </div>
    )

})

export default MainPosts