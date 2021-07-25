import { observer } from "mobx-react-lite";
import './MainPosts.scss';
import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../index";
import { fetchPost, fetchApiEmil, fetchAllDeviceCategory } from "../../http/postAPI";
import { fetchCategory } from "../../http/categoryAPI";
import Main from '../../components/Main/Main';
import Hashtags from '../../components/HashTags/Hashtags';
import CardMiddle from '../../components/CardMiddle/CardMiddle';
import {useLocation } from 'react-router-dom';
import SignUpWeekly from '../../components/SignUpWeekly/SignUpWeekly';

const MainPosts = observer(() => {
    const {post} = useContext(Context)
    const {category} = useContext(Context)
    const[visib, setVisib] = useState(12)
    const [fetching, setFetching] = useState(false)
    const[isLoad, setIsLoad] = useState(false)
    const[target, setTarget] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
        fetchApiEmil().then(data => post.setGetEmilApi(data.data.articles))
        fetchPost(token).then(data => post.setPosts(data.data))

    }, [])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if(fetching) {
            setIsLoad(true)
            //  setTimeout(() => {
                fetchPost(token).then(data =>  {
                    post.setPosts(data.data)
                     setVisib(prevState => prevState + 12)
                })
                .finally(() => {
                    setFetching(false);
                    setIsLoad(false)
                })
            // }, 1500)
        }
    }, [fetching, visib])

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

    const targetClick = (hash) => {
        setTarget(!target)
        category.setSelectedCategory(hash)
        console.log(target)
        if(target) {
            category.setSelectedCategory('')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if(target) {
            fetchAllDeviceCategory(category.selectedCategory._id, token).then(data => post.setPostSort(data.data))
        } else {
            fetchPost(token).then(data => {
                const sortData = data.data.sort((a,b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                post.setPostSort(sortData)
            })
        }

    }, [category.selectedCategory._id, target])


    return(
        <div id="app_moodboost" className="container main-posts">
            <div className="tags-list">
                <Hashtags visibCategory={category.category} targetClick={targetClick} target={target}/> 
            </div>
            <div id="page">
            {/* <Route excat path={POST_ROUTE + '/:id'} component={Post} /> */}
                <main  className="feed">
            {location.pathname === ('/main') && <h4 className="feed__title">{`${!target? 'Life' : `Life-${category.selectedCategory.name}`}`}</h4>}
                    <Main  card={post.postSort} visib={visib} isLoad={isLoad} target={target}/>
                </main>
                <section id="sidebar" data-v-c1e3d870>
                    <div className="content-slidebar">
                        <SignUpWeekly />
                        {post.posts.slice(0, 12).map((card) => {
                                return(
                                    <CardMiddle card={card} key={card._id}/>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
            
             
        </div>
    )

})

export default MainPosts