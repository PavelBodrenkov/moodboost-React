import './AdminPost.scss';
import {Context} from '../../../index'
import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite';
import {fetchPost, fetchDeletePost, fetchOneDevice} from '../../../http/postAPI';
import PopupPost from '../../../components/PopupPost/PopupPost'
import Popup from '../../../components/PopupCategory/PopupCategory';

const AdminPost = observer(() => {
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchPost(token).then(data => post.setPosts(data.data))
    }, [])

    const {post} = useContext(Context)
    const {popup} = useContext(Context)
    
    function deletePost (id) {
        const token = localStorage.getItem("adminToken")
        fetchDeletePost(id, token)
        .then(data => {
            const delcard = post.posts.filter((item) => item._id !== id);
            post.setPosts(delcard)
        })
    }

    function openCategoryPopup  (bool, id) {
        popup.setPopup(true)
        post.setPostEdit(bool)
        post.setSelectedPost(id)
        if(post.postEdit) {
            const token = localStorage.getItem("adminToken")
            fetchOneDevice(post.selectedPost, token).then(data => post.setAppEditPost(data.data))
            
        }
    }

    return(
        <div className="adminPost">
            <div className="adminRole__container">
                <div className="adminRole__header">
                    <h2>Статьи</h2>
                    <button onClick={() => popup.setPopup(true)} type="button" className="btn btn-success">Добавить</button>
                    {/* <button type="button" className="btn btn-danger">Удалить</button> */}
                </div>
                <div className="role-container">
                        <div>
                            <div className="adminPost__wrapper">
                                <div className="adminRole__name">
                                        <p>Название</p>
                                        <p>Изображение</p>
                                        <p>Статус</p>
                                        <p>Дата создания</p>
                                        <p>Просмотры</p>
                                </div>
                                <p>Доступные действия</p>
                            </div>
                            { post.posts.map((post) => {
                                    return(
                                        <div className="adminPost__wrapper_rend adminCategories__wrapper" key={post._id}>
                                            <div className="adminRole__name ">
                                                <p>{post.title}</p>
                                                <img className="posts-image" src={process.env.REACT_APP_API_URL + post.image}/>
                                                <p>{post.status}</p>
                                                <p>{post.created_at}</p>
                                                <p>{post.views}</p>
                                            </div>
                                            <div className="adminPost__buttons">
                                                <button  onClick={() => openCategoryPopup(true, post._id)} type="button" className="btn btn-warning">Редактировать</button>
                                                <button onClick={() => deletePost(post._id)} type="button" className="btn btn-danger">Удалить</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </div>
            </div>
            <PopupPost />
        </div>
    )
})

export default AdminPost