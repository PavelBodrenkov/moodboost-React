import { useState, useContext, useEffect } from 'react'
import './PopupCategory.scss'
import {fetchPostCategory, fetchEditCategory, fetchCategory} from '../../http/categoryAPI'
import {observer} from 'mobx-react-lite';
import {Context} from '../../index'
import { useLocation } from 'react-router-dom';

const Popup = observer(() => {
    const {category} = useContext(Context)
    // const[name, setName] = useState('')
    // const[slug, setSlug] = useState('')
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
    }, [])
   
    const{popup} = useContext(Context)
    const location = useLocation()
    console.log(category.appEditCategory.slug)
    console.log(category.nameCategory)

    function createCategory (e) {
        const token = localStorage.getItem("adminToken")
        e.preventDefault()
        fetchPostCategory(category.nameCategory, category.slugCategory, token).then(data => {category.setAddCategory(data.data); closePopup()})
    }

    function editCategory (e) {
        const token = localStorage.getItem("adminToken")
        e.preventDefault(e)
        fetchEditCategory(category.selectedCategory, category.nameCategory, category.slugCategory, token).then(data => {
            const delcard = category.category.map((item) => item._id === data.data._id ? {...item, name:data.data.name, slug:data.data.slug} : item);
            category.setCategory(delcard)
        })
        popup.setPopup(false)
    }

    useEffect(() => {
        if(!popup.popup) {
            category.setNameCategory('')
            category.setSlugCategory('')
        }
    },[popup.popup])

    useEffect(() => {
        if(category.selectEdit) {
            category.setNameCategory(category.appEditCategory.name)
            category.setSlugCategory(category.appEditCategory.slug)
        }
    },[category.selectEdit, category.appEditCategory.name])

    function closePopup () {
        popup.setPopup(false)
    }

    function escClose(event) {
        if (event.target.classList.contains("open-popup")) {
            popup.setPopup(false)
        }
      }

    return(
        <div onClick={(e) => escClose(e)} className={`popup ${popup.popup && 'open-popup'}`}>
            <div className="popup__container">
                <form onSubmit={category.selectEdit ? editCategory : createCategory} className="popup__form">
                    <label name="name">Имя
                        <input onChange={(e) => category.setNameCategory(e.target.value)} name="name" type="text" placeholder={'Имя'} value={category.nameCategory || ''}/>
                    </label>
                    <label name="name" >Slug (ЧПУ)
                        <input onChange={(e) => category.setSlugCategory(e.target.value)} name="slug" type="text" placeholder={"Slug (ЧПУ)"} value={category.slugCategory|| ''}/>
                    </label>
                    <div>
                        <button type="submit" className="btn btn-success">{category.selectEdit ? "Изменить" : "Добавить"}</button>
                        <button onClick={() => closePopup()} type="button" className="btn btn-warning">Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    )
})

export default Popup