import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react"
import { Context } from "../index";
import { fetchPost, fetchApiEmil } from "../http/postAPI";
import { fetchCategory } from "../http/categoryAPI";
import Aside from './../components/Aside/Aside';
import Main from '../components/Main/Main';

const MainPosts = observer(() => {
    const {post} = useContext(Context)
    const {category} = useContext(Context)
    const[visib, setVisib] = useState(12)
    const [fetching, setFetching] = useState(false)
    const[isLoad, setIsLoad] = useState(false)

    // const srci = "storage/posts/June2021/device1.1.jpg"

    // console.log(srci.slice(20))
    // console.log(srci.split('-').slice(0,1).join('').slice(21) + '.jpg')
    //  console.log(srci.split('.').shift() + '-' + 'cropped' + '.' + srci.split('.').pop())
    //  console.log(srci.split('.').slice(0, -1).join('.') + "-" + 'cropped' + '.' + srci.split('.').pop())
   

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
        
        fetchApiEmil().then(data => post.setGetEmilApi(data.data.articles))
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
            <Aside />
            <Main  man={post.posts} visib={visib} isLoad={isLoad}/>
        </div>
    )

})

export default MainPosts