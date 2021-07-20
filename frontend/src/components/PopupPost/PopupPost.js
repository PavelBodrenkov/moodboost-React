import { observer } from 'mobx-react-lite'
import './PopupPost.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Context} from '../../index'
import { useContext, useEffect, useState } from 'react'
import {fetchCategory} from '../../http/categoryAPI'
import {fetchCreatePost, fetchEditPost, fetchPost} from '../../http/postAPI'
// import CKEditor from "react-ckeditor-component";
// import CKEditor from '../CKEditor/ckeditor';

const PopupPost = observer(() => {
    const token = localStorage.getItem("adminToken")
    const {category} = useContext(Context)
    const {popup} = useContext(Context)
    const {post} = useContext(Context)
    const[slugDirty, setSlugDirty] = useState(false)
    const[statusDirty, setStatusDirty] = useState(false)
    const[categoryDirty, setCategoryDirty] = useState(false)
    const[slugError, setSlugError] = useState('Поле не может быть пустым')
    const[statusError, setStatusError] = useState('Поле не может быть пустым')
    const[categoryError, setCategoryError] = useState('Поле не может быть пустым')

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchPost(token).then(data => post.setPosts(data.data))
    }, [])
   

    function editCategory (e) {
        const token = localStorage.getItem("adminToken")
        e.preventDefault(e)
        const formData = new FormData()
        formData.append('category[category_id]', post.categoryId)
        formData.append('category[name]', post.postCategory)
        formData.append('categoryId', post.categoryId)
        formData.append('title', post.title || '')
        formData.append('body', post.bodyPost || '')
        formData.append('slug', post.slug)
        formData.append('status', post.statusPost)
        formData.append('image', post.file)
        formData.append('views', post.views || 0)
        formData.append('meta_description', post.description || null)
        formData.append('meta_keywords', post.keyWord || null)
        formData.append('seo_title', post.seoTitle || '')

        fetchEditPost(post.selectedPost, formData, token).then(data => {
            console.log(data);closePopup()
            const delcard = post.posts.map((item) => item._id === data.data._id ? {
                ...item, 
                categoryId: data.data.categoryId,
                title: data.data.title,
                body:data.data.body,
                slug:data.data.slug,
                status:data.data.status,
                image:data.data.image,
                views:data.data.views,
                meta_description:data.data.meta_description,
                meta_keywords:data.data.meta_keywords,
                seo_title:data.data.seo_title
            } : item);
            post.setPosts(delcard)
        })
        e.target.reset()
    }
    //Создать карточку
    function createPost (e) {
        e.preventDefault()
        const token = localStorage.getItem("adminToken")
        const formData = new FormData()
        formData.append('category[category_id]', post.categoryId)
        formData.append('category[name]', post.postCategory)
        formData.append('categoryId', post.categoryId)
        formData.append('title', post.title? post.title : null)
        formData.append('body', post.bodyPost? post.bodyPost : null)
        formData.append('slug', post.slug)
        formData.append('status', post.statusPost)
        formData.append('image', post.file)
        formData.append('views', post.views? post.views : 0)
        formData.append('meta_description', post.description? post.description : null)
        formData.append('meta_keywords', post.keyWord? post.keyWord : null)
        formData.append('seo_title', post.seoTitle? post.seoTitle : null)
        fetchCreatePost(formData, token).then(data => {post.setAddPost(data.data); closePopup()})
        e.target.reset()
    }

//Получение id категории
    function showCategoryId (event) {
        post.setPostCategory(event.target.value)
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        post.setCategoryId(id)
        if(!event.target.value) {
            setCategoryError('Поле не может быть пустым')
           } else {
            setCategoryError('')
           } 
    }

    //Получить файл
    function selectFile (e) {
        post.setFile(e.target.files[0]) 
    }

    useEffect(() => {
        if(post.postEdit) {
            post.setTitle(post.appEditPost.title)
            // post.setStatusPost(post.appEditPost.status)
            // post.setBodyPost('')
            // post.setFile(post.appEditPost.image)
            post.setViews(post.appEditPost.views)
            post.setSlug(post.appEditPost.slug)
            post.setDescription(post.appEditPost.meta_description)
            post.setKeyWord(post.appEditPost.meta_keywords)
            post.setSeoTitle(post.appEditPost.meta_keywords)
            post.setStatusPost(post.appEditPost.status)
            // post.setPostCategory(post.appEditPost.category.name)
         setTimeout(() => post.setPostCategory(post.appEditPost.category.name), 150 )
         setTimeout(() =>post.setCategoryId(post.appEditPost.category.category_id), 150)
         setTimeout(() =>post.setBodyPost(post.appEditPost.body), 150)
         
        }
    },[post.postEdit, post.appEditPost])

    //Очистить инпуты если попап закрыт
    useEffect(() => {
        if(!popup.popup) {
            post.setTitle('')
            // post.setStatusPost('')
            // post.setBodyPost('')
            post.setFile(null)
            post.setViews('')
            post.setSlug('')
            post.setDescription('')
            post.setKeyWord('')
            post.setSeoTitle('')
            post.setStatusPost('')
            post.setPostCategory('')
            post.setCategoryId('')
            post.setBodyPost('')
        }
    },[popup.popup, post.description])


//Закрыть попап
    function closePopup () {
        popup.setPopup(false)
        setTimeout(() => post.setPostEdit(false), 500)
    }

const blurHendler = (e) => {
    switch(e.target.name) {
        case "slugerr":
            setSlugDirty(true)
            break
        case "status":
            setStatusDirty(true)
            break
        case "category":
            setCategoryDirty(true)
    }
}

const slugHendler = (e) => {
    post.setSlug(e.target.value)
   if(!e.target.value) {
    setSlugError('Поле не может быть пустым')
   } else {
    setSlugError('')
   } 
}

const statusHendler = (e) => {
    post.setStatusPost(e.target.value)
    if(!e.target.value) {
        setStatusError('Поле не может быть пустым')
       } else {
        setStatusError('')
       } 
}

    return(
        <div  className={`popup-post ${popup.popup && 'open-popup'}`}>
        <div className="popup-post__container">
            <form id="form" onSubmit={post.postEdit ? editCategory : createPost} className="popup-post__form">
                <div className="popup-post__main">
                    <div className="popup-post__main_1">
                        <div className="popup-post__title">
                            <h4>Заголовок</h4>
                            <label name="name">Название статьи
                                <input onChange={(e) => post.setTitle(e.target.value)} name="title" type="text" placeholder={'Заголовок'} value={post.title ? post.title : ""}/>
                            </label>
                        </div>
                        <div className="popup-post__redactor">
                            <h4>Текст статьи</h4>
                            <CKEditor 
                                    editor={ClassicEditor}
                                    data={post.bodyPost}
                                    onChange={(event,editor) => {
                                        const data = editor.getData();
                                        post.setBodyPost(data)
                                    }}
                                    config={
                                        {
                                            ckfinder: {
                                                uploadUrl:'http://localhost:3000/upload',
                                                options: {
                                                resourseType:'Image',
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    authorization : `Bearer ${token}`
                                                    }
                                                }
                                            }
                                        }
                                    }
                                />
                        </div>
                        <div className="popup-post__anons">
                            <div>
                                <h4>Анонс <span>краткое описание статьи</span></h4>
                            </div>
                            <label name="anons">
                                <textarea type="text"/>
                            </label>
                        </div>
                        <div className="popup-post__dop-info">
                            <h4>Дополнительные поля</h4>
                            <label name="nameviews">Просмотры
                                <input onChange={(e) => post.setViews(e.target.value)} type="number" name="views" value={post.views ? post.views: ""} placeholder="Просмотры"/>
                            </label>
                        </div>
                    </div>
                    <div className="popup-post__main_2">
                        <div className="popup-post__select">
                            <div className="popup-post__select_wrapper">
                                <div>
                                    <div>
                                        <h4>Ссылка</h4>
                                    </div>
                                    <label name="slug">
                                        <input onBlur ={(e) => blurHendler(e)} onChange={(e) => slugHendler(e)} type="text" name="slugerr" placeholder="slug" value={post.slug ? post.slug : ""}/>
                                        {(slugDirty && slugError) && <div style={{color: 'red'}}>{slugError}</div>}
                                    </label>
                                </div>
                                <div>
                                    <h4>Свойства</h4>
                                </div>
                                <label name="public">
                                    Статус публикации
                                    <select onBlur ={(e) => blurHendler(e)} className="select-public" onChange={(e) => statusHendler(e)}  name="status" value={post.statusPost ? post.statusPost : "DEFAULT"}>
                                        <option value="DEFAULT" disabled>Выберите статус...</option>
                                        <option value="Опубликовано">Опубликовано</option>
                                        <option value="Черновик">Черновик</option>
                                        <option value="На публикации">На публикации</option>
                                    </select>
                                    {(statusDirty && statusError) && <div style={{color: 'red'}}>{statusError}</div>}
                                </label>
                                <label name="category">
                                    Категория статьи
                                    <select onBlur ={(e) => blurHendler(e)} multiple={false} className="select-category" onChange={(e) => showCategoryId(e)} name="category" value={post.postCategory ? post.postCategory : "DEFAULT"}>
                                        <option value="DEFAULT" disabled>Выберите категорию...</option>
                                        {category.category.map((category) => {
                                
                                            return(
                                                <option valut={category.name} id={category._id} key={category._id}>{category.name}</option>
                                            )
                                        })} 
                                    </select>
                                    {(categoryDirty && categoryError) && <div style={{color: 'red'}}>{categoryError}</div>}
                                </label>
                           </div>
                        </div>
                        <div className="popup-post__image">
                            <div>
                                {post.postEdit && <img src={process.env.REACT_APP_API_URL+post.appEditPost.image} />}
                            </div>
                            <div>
                                <h4>Изображение</h4>
                            </div>
                            <input onChange={selectFile} type="file" name="file"/>
                        </div>
                        <div className="popup-post__seo">
                            <div>
                                <h4>SEO текст</h4>
                            </div>
                            <label name="metadescription">Описание (meta)
                                <textarea onChange={(e) => post.setDescription(e.target.value)} value={post.description ? post.description : ''}></textarea>
                            </label>
                            <label name="metakey">
                                Ключевые слова (meta)
                                <textarea onChange={(e) => post.setKeyWord(e.target.value)} value={post.keyWord ? post.keyWord : ''}></textarea>
                            </label>
                            <label name="seoname">
                                SEO название
                                <input type="text" placeholder="SEO title" onChange={(e) => post.setSeoTitle(e.target.value)} value={post.seoTitle ? post.seoTitle : ''}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-success">{post.postEdit ? "Редактировать":"Добавить"}</button>
                    <button onClick={() => closePopup()} type="reset" from="form" className="btn btn-warning">Отмена</button>
                </div>
            </form>
        </div>
        
    </div>
    )
})

export default PopupPost