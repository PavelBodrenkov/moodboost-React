import './Comments.scss';
import buttonMessage from '../../image/button-message.svg'
import buttonFile from '../../image/button-file.svg';

import React, { useEffect, useState , useContext} from 'react';
import {fetchComment, fetchAllComment} from './../../http/commentApi'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { useParams} from 'react-router-dom';
import moment from 'moment';
import Comment from './../Comment/Comment';

const Comments = observer(({device}) => {
    const [textVal, setTextVal] = useState('')
    const {comment} = useContext(Context)
    const {admin} = useContext(Context)
    const {user} = useContext(Context)
    const {id} = useParams()

    function hendleText (e) {
        setTextVal(e.target.value)
    }

   function hendleSubmitComment (e) {
    e.preventDefault()
    const token = localStorage.getItem("adminToken")
    const usertoken = localStorage.getItem("userToken")
    if(admin.isAuth || user.isAuth) {
        fetchComment(textVal, device._id, token === null ? usertoken : token).then(data => comment.setComment(data.data))
    } else {
        user.setOpenAuth(true)
    }
    setTextVal('')
   }

   useEffect(() => {
       setTimeout(() => {
        fetchAllComment(id).then(data => comment.setAllComments(data.data))
       }, 1500)
   }, [])

    return(
        <section className="comments" >
            <div className="comments__content_title">
                <h4  className="comments__title">Comments</h4>
                <ul className="comments__title_lists">
                    <li><a>Hot</a></li>
                    <li><a>Fresh</a></li>
                </ul>
            </div>
            {comment.allComments.map((comment) => {
               
                    return (
                        <Comment device={device} comment1={comment} key={comment._id}/>
                     )
                
                   
                })}
            <div >
                <div>
                    <div  className="comments__content_message">
                        <textarea  onChange={(e) => hendleText(e)} className="comments__textarea" placeholder="Написать комментарий..." value={textVal}></textarea>
                        <div className="comments__content_button">
                            <div className="comments__download-file">
                                <label>
                                    <input className="comments__input" type="file" name="file"/>
                                </label>
                            </div>
                            <button onClick={(e) => hendleSubmitComment(e)} type="submit" className="comments__button"><img src={buttonMessage} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default Comments