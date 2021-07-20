import React, {useState, useContext, useEffect} from "react"
import './LoginAdmin.scss'
import {fetchLoginAdmin, fetchAdminMe} from '../../../http/adminAPI'
import { observer } from "mobx-react-lite"
import { Context } from "../../../index";
import {useHistory, Link} from 'react-router-dom'
import {ADMIN_ROUTE} from '../../../utils/consts'


const Login = observer(() => {

const history = useHistory()
const[email, setEmail] = useState('')
const[password, setPassword] = useState('')

const {admin} = useContext(Context)

//Отправка запроса на вход
 const click = async (e) => {
     e.preventDefault()
     const response = await fetchLoginAdmin(email, password)
     console.log(response)
     if(response.data.token) {
        admin.setIsAuth(true)
        localStorage.setItem('adminToken', response.data.token)
        history.push(ADMIN_ROUTE)
     }
     console.log(response)
 }

 //Проверка токена
 useEffect(() => {
     console.log(localStorage.getItem("adminToken"))
     if(localStorage.getItem("adminToken")) {
        const token = localStorage.getItem("adminToken")
        if(token) {
            fetchAdminMe(token).then(res => {
                if(res) {
                    history.push(ADMIN_ROUTE)
                    admin.setIsAuth(true)
                }
            })
        }
     }
 }, [admin.isAuth])

    return(
        <div className="login">
        <form onSubmit={(e) => click(e)}className="form">
            <h2 className="login__title">Панель администратора</h2>
            <label className="login__label" ></label>
            <input onChange={(e) => setEmail(e.target.value)} className="login__input-name" type="email" placeholder="Введите email" value={email}/>
            <label className="login__label"></label>
            <input onChange={(e) => setPassword(e.target.value)} className="login__input-name"  type="password" placeholder="Введите пароль" value={password}/>
            <button className="login__button" type="submit">Войти</button>
            <Link to="/"><button className="login__button login__return" type="button">Вернуться на главную страницу</button></Link>
        </form>
        
    </div>
    )
})

export default Login