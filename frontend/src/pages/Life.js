import React, {useState, useEffect, useContext} from "react"
import Aside from '../components/Aside/Aside';
import Main from '../components/Main/Main';
import { fetchPost, fetchApiEmil } from "../http/postAPI";
import { fetchCategory } from "../http/categoryAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Life = observer(() => {
    const[visib, setVisib] = useState(12)
    const[isLoad, setIsLoad] = useState(false)
    const {post} = useContext(Context)
    const {category} = useContext(Context)
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if(fetching) {
            setIsLoad(true)
             setTimeout(() => {
                fetchPost(token).then(data =>  {
                    post.setPosts(data.data)
                     setVisib(prevState => prevState + 12)
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
const[categoryLife, setCategoryLife] = useState([])
const[postLife, setPostLife] = useState([])

useEffect(() => {
    const categoryFilter = (category.category.filter((item) => item.name_parent === 'LIFE'))
    setCategoryLife(categoryFilter)
},[])

useEffect(() => {
    const sortPost = post.posts.sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    })
    setPostLife(sortPost)
}, [post.posts])
 
console.log(post.posts)


    return(
        <div id="app_moodboost" className="container">
            <Aside />
            <Main  man={postLife} visib={visib} isLoad={isLoad} visibCategory={categoryLife}/>
        </div>
    )
})

export default Life