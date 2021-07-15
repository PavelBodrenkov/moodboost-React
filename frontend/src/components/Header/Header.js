import './Header.scss';
import moodboostLogo from '../../image/moodboost-logo.svg';
import { Link} from 'react-router-dom';
import menu from '../../image/menu.svg'
import { LIFE_ROUTE, MAINPOSTS_ROUTE, SEARCH_ROUTE } from '../../utils/consts';
import {fetchPostCategory, fetchApiEmilCategories} from '../../http/categoryAPI'
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchCreatePost } from "../../http/postAPI";
import React, {useState, useContext} from 'react';
import { Context } from "./../../index";


const Header = observer(() => {
const {category} = useContext(Context)
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

function createPost () {
    // const formData = new FormData()
    // formData.append('category_id', '60e6ca99ba872c46282d7576')
    // formData.append('title', 'hjfghjfghj')
    // formData.append('body', 'dfghdfghfgh')
    // formData.append('slug', 'dfghfghfg')
    // formData.append('status', 'dfghdfgh')
    // formData.append('image', file)
    
    const formData = new FormData()
    // fetchCreatePost('60e6ca99ba872c46282d7576', 'hjfghjfghj', 'fghdfghfg', 'dfghdfgh', 'dfghdfghfgh', 'dfghfghfg', 'dfghdfghd', 'dfghdfgh', 'dfghdfgh', 2).then(data => console.log(data))
    category.EmilCategory.forEach((post) => {
        formData.append('category_id', post.category.id)
        formData.append('title', post.title)
        formData.append('body', post.body)
        formData.append('slug', post.slug)
        formData.append('status', 'dfghdfgh')
        formData.append('image', post.thumbniels.cropped)
    })
    fetchCreatePost(formData).then(data => console.log(data))
}

useEffect(() => {
    fetchApiEmilCategories().then(data => category.setEmilCategory(data.data.categories))
}, [])


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
                            </li>
                            <li>
                                <button onClick={() => createPost()} >Добавить карточку</button>
                            </li> */}
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