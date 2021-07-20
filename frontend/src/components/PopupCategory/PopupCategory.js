import { useState, useContext, useEffect } from 'react'
import './PopupCategory.scss'
import {fetchPostCategory, fetchEditCategory, fetchCategory} from '../../http/categoryAPI'
import {observer} from 'mobx-react-lite';
import {Context} from '../../index'
import { useLocation } from 'react-router-dom';

const Popup = observer(() => {
    const {category} = useContext(Context)
    const[slugDirty, setSlugDirty] = useState(false)
    const[nameDirty, setnameDirty] = useState(false)
    const[slugError, setSlugError] = useState('Поле не может быть пустым')
    const[nameError, setNameError] = useState('Поле не может быть пустым')

    const blurHendler = (e) => {
        switch(e.target.name){
            case 'name':
                setnameDirty(true)
                break
            case 'slug':
                setSlugDirty(true)
        }
    }

    const nameHendler = (e) => {
        category.setNameCategory(e.target.value)
        if(!e.target.value) {
            setNameError('Поле не может быть пустым')
        } else {
            setNameError('')
        }
    }

    const slugHendler = (e) => {
        category.setSlugCategory(e.target.value)
        if(!e.target.value) {
            setSlugError('Поле не может быть пустым')
        } else {
            setSlugError('')
        }
    }
   //Получить все категории
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
    }, [])
   
    const{popup} = useContext(Context)
    console.log(category.appEditCategory.slug)
    console.log(category.nameCategory)

    //Создать категорию
    function createCategory (e) {
        const token = localStorage.getItem("adminToken")
        e.preventDefault()
        fetchPostCategory(category.nameCategory, category.slugCategory, token).then(data => {category.setAddCategory(data.data); closePopup()})
    }
// Редактировать категорию
    function editCategory (e) {
        const token = localStorage.getItem("adminToken")
        e.preventDefault(e)
        fetchEditCategory(category.selectedCategory, category.nameCategory, category.slugCategory, token).then(data => {
            const delcard = category.category.map((item) => item._id === data.data._id ? {...item, name:data.data.name, slug:data.data.slug} : item);
            category.setCategory(delcard)
        })
        popup.setPopup(false)
    }

    //Очистить инпуты при закрытии попапа
    useEffect(() => {
        if(!popup.popup) {
            category.setNameCategory('')
            category.setSlugCategory('')
        }
    },[popup.popup])

//Подтянуть инфо при редактировании
    useEffect(() => {
        if(category.selectEdit) {
            category.setNameCategory(category.appEditCategory.name)
            category.setSlugCategory(category.appEditCategory.slug)
        }
    },[category.selectEdit, category.appEditCategory.name])

    //Закрыть попап
    function closePopup () {
        popup.setPopup(false)
    }
//Закрыть попап по Esc
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
                        <input onBlur={(e) => blurHendler(e)} onChange={(e) => nameHendler(e)} name="name" type="text" placeholder={'Имя'} value={category.nameCategory || ''}/>
                    {(nameDirty && nameError) && <div style={{color:'red'}}>{nameError}</div>}
                    </label>
                    <label name="name" >Slug (ЧПУ)
                        <input onBlur={(e) => blurHendler(e)} onChange={(e) => slugHendler(e)} name="slug" type="text" placeholder={"Slug (ЧПУ)"} value={category.slugCategory|| ''}/>
                        {(slugDirty && slugError) && <div style={{color:'red'}}>{slugError}</div>}
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