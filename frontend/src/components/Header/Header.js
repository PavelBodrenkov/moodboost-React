import './Header.scss';
import moodboostLogo from '../../image/moodboost-logo.svg';
import { Link} from 'react-router-dom';
import menu from '../../image/menu.svg'
import { LIFE_ROUTE, MAINPOSTS_ROUTE, SEARCH_ROUTE } from '../../utils/consts';
import {fetchPostCategory, fetchApiEmilCategories} from '../../http/categoryAPI'
import {fetchApiEmil} from '../../http/postAPI';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchCreatePost } from "../../http/postAPI";
import React, {useState, useContext} from 'react';
import { Context } from "./../../index";


const Header = observer(() => {
const {category} = useContext(Context)
const {post} = useContext(Context)
const[file, setFile] = useState(null)

// function createCategory () {
//     // fetchPostCategory(1, 'Animals', 'Animals').then(data => console.log(data))
//     category.EmilCategory.forEach((category) => {
//         let myPosts = {
//             sort:`${category.order}`,
//             name:category.name,
//             slug:category.slug,
//             created_at:category.created_at,
//             updated_at:category.updated_at
//         }
//         fetchPostCategory(myPosts)
//     })
    
// }
// function createPost (e) {
//     e.preventDefault()
//     const token = localStorage.getItem("adminToken")
//     const formData = new FormData()
//     formData.append('category[category_id]', post.categoryId)
//     formData.append('category[name]', post.postCategory)
//     formData.append('title', post.title)
//     formData.append('body', post.bodyPost)
//     formData.append('slug', post.slug)
//     formData.append('status', post.statusPost)
//     formData.append('image', post.file)
//     formData.append('views', post.views)
//     formData.append('meta_description', post.description)
//     formData.append('meta_keywords', post.keyWord)
//     formData.append('seo_title', post.seoTitle)
//     fetchCreatePost(formData, token).then(data => {post.setAddPost(data.data); closePopup()})
//     e.target.reset()
// }


function createPost (e) {
    e.preventDefault()
    const token = localStorage.getItem("adminToken")
    
    category.emilCategory.forEach((post) => {
    const formData = new FormData()
    formData.append('category[category_id]', post.category.id)
    formData.append('title', post.title)
    formData.append('body', post.body)
    formData.append('slug', post.slug)
    formData.append('status', post.status)
    // formData.append('image', post.thumbnails.cropped)
    fetchCreatePost(formData, token).then(data => console.log(data))
    })
   
}

useEffect(() => {
    fetchApiEmil().then(data => category.setEmilCategory(data.data.articles))
}, [])

console.log(category.emilCategory)


function selectFile (e) {
    setFile(e.target.files[0]) 
}

    return(
        <header className="header">
                <nav className="header__navbar">
                    <div className="container">
                        <Link  to={MAINPOSTS_ROUTE} className="header__header__navbar">
                            <img className="header__navbar_brand-image" src={moodboostLogo} />
                        </Link>
                        <ul id="catigories_menu" className="header__navbar_nav">
                            <li className="header__navbar_nav-link">
                                <Link to={LIFE_ROUTE} className="header__navbar_nav-link">
                                    <span>LIFE</span>
                                </Link>
                            </li>
                            {/* <li>
                                <button onClick={() => createCategory()} >Добавить категорию</button>
                                <input onChange={ selectFile} type="file" />
                            </li> */}
                            <li>
                                <button onClick={(e) => createPost(e)} >Добавить карточку</button>
                            </li> 
                        </ul>
                        <ul className="header__navbar_menu">
                            <li className="headr__navbar_menu-li header__navbar_menu-li_search">
                                <Link to={SEARCH_ROUTE} className="header__navbar_menu-link"><i className="icon-search"></i></Link>
                            </li>
                            <li className="header__navbar_menu-li header__navbar_menu-li_toggler">
                                <a href="#" id="sidebar_toggler" className="header__navbar_menu-link">
                                    <img src={menu} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>  
        </header>
    )
})

export default Header