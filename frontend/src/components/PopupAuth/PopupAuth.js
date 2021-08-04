import './PopupAuth.scss';
import HeadPers from '../../image/pers-footer-2.svg'
import HeadLogo from '../../image/logo-footer.svg'
import viewsPassword from '../../image/views-password.svg'
import React, {useEffect, useRef, useState, useContext} from 'react';
import {fetchRegister, fetchLoginUser, fetchUserMe} from '../../http/userAPI'
import ErrorStatus from '../../image/error.svg';
import GoodStatus from '../../image/good-status.svg'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import {MAINPOSTS_ROUTE} from '../../utils/consts'
import { useHistory } from 'react-router-dom';


const PopupAuth = observer(() => {
const views = useRef(null)
const[loginIn, setLoginIn] = useState(true)
const[signUp, setSignUp] = useState(false)
const[forgitPass, setForgotPass] = useState(false)
const[login, setLogin] = useState('')
const[text, setText] = useState('')
const [textError, setTextError] = useState("The field cannot be empty")
const [textDirty, setTextDirty] = useState(false)
const[email, setEmail] = useState('')
const [emailError, setEmailError] = useState("The field cannot be empty")
const [emailDirty, setEmailDirty] = useState(false)
const[password, setPassword] = useState('')
const [passwordError, setPasswordError] = useState("The field cannot be empty")
const [passwordlDirty, setPasswordDirty] = useState(false)
const[verifyPassword, setVerifyPassword] = useState('')
const[verifyPasswordError, setVerifyPasswordError] = useState("")
const [verifyPasswordDirty, setVerifyPasswordDirty] = useState(true)
const [formValid, setFormValid] = useState(false)
const [checked, setChecked] = useState(false);
const history = useHistory()
const {user} = useContext(Context)
const {admin} = useContext(Context)

    useEffect (() => {
        if(emailError || passwordError || textError || verifyPasswordDirty || !checked) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[emailError, passwordError, textError, verifyPasswordDirty, checked])

    const textHendler = (e) => {
        setText(e.target.value)
        if(e.target.value === '') {
            setTextError("The field cannot be empty")
        } else {
            setTextError("")
        }
    }

    const emailHendler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("invalid email")
            if(!e.target.value) {
                setEmailError("The field cannot be empty")
            }
        }else {
            setEmailError("")
        }
    }

    const passwordHendler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 6) {
            setPasswordError("Password is too short (minimum is 6 characters)")
            if(!e.target.value) {
                setPasswordError("The field cannot be empty")
            }
        } else {
            setPasswordError("")
        }
    }

    const verifyPasswordHendler = (e) => {
        setVerifyPassword(e.target.value)
    }

    useEffect(() => {
    if( password !== verifyPassword && verifyPassword.length > 1) {
        setVerifyPasswordError('Passwords dont match')
        setVerifyPasswordDirty(true)
    } else if (verifyPassword.length <= 1) {
        setVerifyPasswordDirty(true)
    } else {
        setVerifyPasswordError('')
        setVerifyPasswordDirty(false)
    }
        
    }, [password, verifyPassword, verifyPasswordError])

    const blurHendler = (e) => {
        switch (e.target.name) {
            case 'text':
                setTextDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'verifyPassword':
                setVerifyPasswordDirty(true)
                break
        }
    }
    //Запрос регистрации
    function hendleSubmin (e) {
        e.preventDefault()
        fetchRegister(text, email, password).then(user1 => {
            if(user1) {
                console.log(user1.data)
                chengeLogin()
                user.setUserError('')
            }
        })
        .catch((err) => user.setUserError(err.response.data.message))
    }

    //Запрос на вход
    function hendleSubmitLogin (e) {
        e.preventDefault()
        fetchLoginUser(email, password).then(data => {
            if(data.data.token) {
                    user.setIsAuth(true)
                    localStorage.setItem('userToken', data.data.token)
                    history.push(MAINPOSTS_ROUTE)
                    user.setOpenAuth(false)
            }
        })
        .catch((err) =>  user.setUserError(err.response.data.message))
    }


    //Проверка токена
 useEffect(() => {
    if(localStorage.getItem("userToken")) {
       const token = localStorage.getItem("userToken")
       if(token) {
           fetchUserMe(token).then(res => {
               if(res) {
                admin.setAdmin(res.data)
                //    history.push(MAINPOSTS_ROUTE)
                   user.setIsAuth(true)
               }
           })
       }
    }
}, [user.isAuth])

    function targetViews () {
        if(views.current.type === 'password') {
            views.current.type = 'text'
        } else {
            views.current.type = 'password'
        }
    }

    function chengeLogin () {
        setLoginIn(true)
        setSignUp(false)
        setForgotPass(false)
        setPassword('')
        setEmail('')
        user.setUserError('')
        setEmailDirty(false)
        setEmailError('')
    }

    function chengeSignUp () {
        setLoginIn(false)
        setSignUp(true)
        setForgotPass(false)
        setText('')
        setEmail('')
        setVerifyPassword('')
        setPassword('')
        user.setUserError('')
        setVerifyPasswordError('')

    }

    function chengeForgotPassword () {
        setForgotPass(true)
        setLoginIn(false)
        setSignUp(false)
    }

    function handleChange() {
		setChecked(!checked);
	}
    function escClose(event) {
        if (event.target.classList.contains("open-popup")) {
            user.setOpenAuth(false)
        }
      }
  

    return(
        <div onClick={(e) => escClose(e)} className={`popup-auth ${user.openAuth && 'open-popup'}`}>
            <div className={`popup-auth__content ${signUp && "popup-signUp"}`}>
                <div className={`popup-auth__main ${signUp && "main-signUp"} ${forgitPass && "main-forgot"}`}>
                    <div className="head">
                        <div className="head__container">
                            <img src={HeadPers} className="head__pers"/>
                            <img src={HeadLogo} className="head__logo"/>
                        </div>
                        <div className="head__buttons">
                            <button onClick={() => chengeLogin()} type="button" className="head__buttons_log">Log in</button>
                            <button onClick={() => chengeSignUp()} type="button" className="head__buttons_sign">Sign Up</button>
                        </div>
                    </div>
                   {loginIn && 
                   <form onSubmit={(e) => hendleSubmitLogin(e)} className="popup-auth__form">
                        {user.userError ? <span className={"register__error"}>* {user.userError}</span> : ""}
                        <div className="popup-auth__form_content">
                            <div className="popup-auth__form_email-block">
                                <p className="popup-auth__form_email-title">Username or E-mail</p>
                                <input onChange={(e) => emailHendler(e)} className="popup-auth__form_email-input" type="email" placeholder="Enter E-mail"/>
                            </div>
                            <div>
                                <div className="popup-auth__form_passwords">
                                    <p className="popup-auth__form_email-title">Password</p>
                                    <p onClick={() => chengeForgotPassword()} className="popup-auth__form_passwords_forgot">Forgot pass?</p>
                                </div>
                                <div className="popup-auth__form_passwords-block">
                                    <input onChange={(e) => passwordHendler(e)} className="popup-auth__form_password-input" type="password" ref={views} placeholder="password"/>
                                    <img src={viewsPassword} className="popup-auth__form_passwords-views" onClick={() => targetViews()}/>
                                </div>
                            </div>
                        </div>
                        <button className="popup-auth__form_button">Go to profile</button>
                    </form>}
                    {signUp &&
                        <form onSubmit={(e) => hendleSubmin(e)} className="popup-auth__form">
                             {(textDirty && textError) && <span className={"register__error"}>* {textError}</span>}
                             {(emailDirty && emailError) && <span className={"register__error"}>* {emailError}</span>}
                             {(passwordlDirty && passwordError) && <span className={"register__error"}>* {passwordError}</span>}
                             {(verifyPasswordError) && <span className={"register__error"}>* {verifyPasswordError}</span>}
                             {user.userError ? <span className={"register__error"}>* {user.userError}</span> : ""}
                            <div className="popup-auth__form_content">
                                <div className="popup-auth__form_email-block">
                                    <p  className="popup-auth__form_email-title">Username</p>
                                    <div className="popup-auth__form_text-block">
                                        <input onBlur={(e) => blurHendler(e)} onChange={(e) => textHendler(e)} className="popup-auth__form_email-input" name="text" type="text" placeholder="user name" value={text}/>
                                        <img src={textDirty ? ((textDirty && textError) ?  ErrorStatus: GoodStatus) : "" } className="popup-auth__form_good-status"/>
                                    </div>
                                </div>
                                <div className="popup-auth__form_email-block">
                                    <p className="popup-auth__form_email-title">Username or E-mail</p>
                                    <div className="popup-auth__form_text-block">
                                        <input onBlur={e => blurHendler(e)} onChange={(e) => emailHendler(e)} className="popup-auth__form_email-input" name="email" type="email" placeholder="email" value={email}/>
                                        <img src={emailDirty ? ((emailDirty && emailError) ?  ErrorStatus: GoodStatus) : "" } className="popup-auth__form_good-status"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="popup-auth__form_passwords">
                                        <p className="popup-auth__form_email-title">Password</p>
                                    </div>
                                    <div className="popup-auth__form_passwords-block">
                                        <input onBlur={e => blurHendler(e)} onChange={(e) => passwordHendler(e)} className="popup-auth__form_password-input" name="password" type="password" ref={views} placeholder="password" value={password}/>
                                        <img src={viewsPassword} className="popup-auth__form_passwords-views" onClick={() => targetViews()}/>
                                    </div>
                                </div>
                                <div className="popup-auth__form_verify-password">
                                    <p className="popup-auth__form_email-title">Verify password</p>
                                    <div className="popup-auth__form_passwords-block">
                                        <input onChange={(e) => verifyPasswordHendler(e)} className="popup-auth__form_password-input verifyPassword" type="password" name="verifyPassword" placeholder="6+ characters" value={verifyPassword}/>
                                        <img src={(verifyPassword.length > 1) ? (verifyPasswordError ?  ErrorStatus : GoodStatus) : ''} className="popup-auth__form_good-status"/>
                                    </div>
                                </div>
                                <div className="popup-auth__form_checkbox">
                                    <input id="check" type="checkbox" checked={checked} onChange={() => handleChange()} className="popup-auth__form_input-checkbox"/>
                                    <label htmlFor="check"></label>
                                    <p className="popup-auth__form_checkbox-text">Creating an account means you’re okay with our <span>Terms of Service, 
                                        Privacy Policy,</span> and our default <span>Notification Settings.</span></p>
                                </div>
                             </div>
                        <button disabled={!formValid} className={`popup-auth__form_button ${!formValid && "disabled"}`}>Create account</button>
                    </form>
                    }
                    {forgitPass &&
                    <form className={`popup-auth__form ${forgitPass && "form-forgot"}`}>
                        <div className="popup-auth__form_content">
                            <p className="popup-auth__form_forgot-text">Forgot Password? <span>Enter the email address you used</span> when you joined and <span>we’ll 
                                send you instructions</span> to reset your password.</p>
                            <div className="popup-auth__form_email-block popup-auth__form_email-block-forgot">
                                <p className="popup-auth__form_email-title">E-mail adress</p>
                                <input className="popup-auth__form_email-input" type="email" placeholder="email"/>
                            </div>
                        </div>
                <button className={`popup-auth__form_button ${forgitPass && "form-button-forgot"}`}>Send Reset Insructions</button>
            </form>
                    
                    }
                </div>
            </div>
        </div>
    )
})

export default PopupAuth