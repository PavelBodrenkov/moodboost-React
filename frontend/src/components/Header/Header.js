import './Header.scss';
import moodboostLogo from '../../image/moodboost-logo.svg';
import { Link, NavLink, useHistory, useLocation} from 'react-router-dom';
import { LIFE_ROUTE, MAINPOSTS_ROUTE, SEARCH_ROUTE } from '../../utils/consts';
import {fetchPostCategory, fetchApiEmilCategories} from '../../http/categoryAPI'
import {fetchApiEmil} from '../../http/postAPI';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchCreatePost } from "../../http/postAPI";
import React, {useState, useContext} from 'react';
import { Context } from "./../../index";
import pers from '../../image/pers.svg'
import menu from '../../image/menu.svg'


const Header = observer(() => {
    // useEffect(() => {
    //     fetchApiEmil().then(data => category.setEmilCategory(data.data.articles))
    // }, [])

const {category} = useContext(Context)
const {post} = useContext(Context)
const[file, setFile] = useState(null)
const {user} = useContext(Context)
const {admin} = useContext(Context)
const {aside} = useContext(Context)
const history = useHistory()

// function createCategory () {
//     const token = localStorage.getItem("adminToken")
//     // fetchPostCategory(1, 'Animals', 'Animals').then(data => console.log(data))
//     category.emilCategory.forEach((category) => {
//         let myPosts = {
//             sort:`${category.order}`,
//             name:category.name,
//             slug:category.slug,
//             created_at:category.created_at,
//             updated_at:category.updated_at
//         }
//         fetchPostCategory(myPosts, token)
//     })
// }

// useEffect(() => {
//     fetchApiEmilCategories().then(data => category.setEmilCategory(data.data.categories))
// }, [])
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

function getid (post) {
    if(post == 3) {
        return "60f3e2bb07f1162dd807e896"
    } else if(post == 4) {
        return "60f3e2bb07f1162dd807e89a"
    } else if(post == 5) {
        return "60f3e2bb07f1162dd807e898"
    } else if(post == 6) {
        return "60f3e2bb07f1162dd807e89c"
    } else if(post == 7) {
        //movies
        return "60f3e2bb07f1162dd807e89e"
    } else if(post == 8) {
        return "60f3e2bb07f1162dd807e8a0"
    } else if(post == 9) {
        return "60f3e2bb07f1162dd807e8a8"
    } else if(post == 10) {
        return "60f3e2bb07f1162dd807e8aa"
    } else if(post == 11) {
        //technology
        return "60f3e2bb07f1162dd807e8ac"
    } else if(post == 12) {
        return "60f3e2bb07f1162dd807e8ae"
    } else if(post == 13) {
        return "60f3e2bb07f1162dd807e8b0"
    }else if(post == 14) {
        return "60f3e2bb07f1162dd807e8b2"
    } else if(post == 15) {
        return "60f3e2bb07f1162dd807e8ba"
    } else if(post == 16) {
        return "60f3e2bb07f1162dd807e8bc"
    } else if(post == 17) {
        return "60f3e2bb07f1162dd807e8be"
    } else if(post == 18) {
        return "60f3e2bb07f1162dd807e8c0"
    } else if(post == 22) {
        return "60f3e2bb07f1162dd807e8c2"
    } else if(post == 32) {
        return "60f3e2bb07f1162dd807e8c4"
    } else if(post == 33) {
        //selebrity
        return "60f3e2bb07f1162dd807e8c7"
    }
    
}

function stsuse (status) {
    if(status == "PUBLISHED") {
        return "Опубликовано"
    }
}

// srci.split('-').slice(0,1).join('').slice(21) + '.' + srci.split('-')[1].split('.')[1]

function createPost (e) {
    e.preventDefault()
        const token = localStorage.getItem("adminToken")
        category.emilCategory.forEach((post) => {
        const formData = new FormData()
        formData.append('category[category_id]', getid(post.category_id))
        formData.append('category[name]', post.category?.name)
        formData.append('categoryId', getid(post.category_id))
        formData.append('title', post.title)
        formData.append('body', post.body)
        formData.append('slug', post.slug)
        formData.append('status', stsuse(post.status))
        // formData.append('image', post.thumbnails.cropped.split('-').slice(0,1).join('').slice(21) + '.jpg')
        formData.append('image', post.thumbnails.cropped.split('-').slice(0,1).join('').slice(21) + '.' + post.thumbnails.cropped.split('-')[1].split('.')[1])
        formData.append('views', post.views)
        formData.append('meta_description', post.meta_description)
        formData.append('meta_keywords', post.meta_keywords)
        formData.append('seo_title', post.seo_title)
        fetchCreatePost(formData, token).then(data => console.log(data))
       
})
}

function selectFile (e) {
    setFile(e.target.files[0]) 
}

function asideHendler () {
aside.setIsAsideOpen()
}

function openAuth () {
    if(admin.isAuth || user.isAuth) {
        localStorage.removeItem('userToken')
        admin.setIsAuth(false)
        user.setIsAuth(false)
    } else {
        user.setOpenAuth(true)
    }
}

console.log(aside.isAsideOpen)

function exit () {
    localStorage.removeItem('userToken')
}
    return(
        <header className="header">
                <nav className="header__navbar container">
                        <a href={MAINPOSTS_ROUTE} className="header__header__navbar">
                            <img className="header__logo" src={pers}/>
                             <img className="header__navbar_brand-image" src={moodboostLogo} />
                        </a>
                        {/* <a href={MAINPOSTS_ROUTE} onClick={() => exit()}>выход</a> */}
                        {/* <ul id="catigories_menu" className="header__navbar_nav">
                            <li className="header__navbar_nav-link">
                                <NavLink to={LIFE_ROUTE}  activeClassName="active" className="header__navbar_nav-link">
                                    <span>LIFE</span>
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <button onClick={() => createCategory()} >Добавить категорию</button>
                                <input onChange={ selectFile} type="file" />
                            </li> */}
                            {/* <li>
                                <button onClick={(e) => createPost(e)} >Добавить карточку</button>
                            </li>  */}
                        {/* </ul> */}
                        <ul className="header__navbar_menu">
                            <li className="headr__navbar_menu-li header__navbar_menu-li_search">
                                <Link to={SEARCH_ROUTE} className="header__navbar_menu-link"><i className="icon-search"></i></Link>
                            </li>
                            <li onClick={() => openAuth()} className="header__navbar_menu__logn-in">
                                <button  className="header__navbar_menu__logn-in_button">{admin.isAuth || user.isAuth ? "Exit" : "Log in"}</button>
                            </li>
                            <li onClick={() => asideHendler()} className="header__navbar_menu-li header__navbar_menu-li_toggler">
                                <a href="#" id="sidebar_toggler" className="header__navbar_menu-link">
                                    <img src={menu} />
                                </a>
                            </li>
                        </ul>
                </nav>  
        </header>
    )
})

export default Header