import './AdminPost.scss';
import {Context} from '../../../index'
import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite';
import {fetchPost, fetchDeletePost, fetchOneDevice} from '../../../http/postAPI';
import PopupPost from '../../../components/PopupPost/PopupPost'

const AdminPost = observer(() => {
   

    const {post} = useContext(Context)
    const {popup} = useContext(Context)
    const {admin} = useContext(Context)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchPost(token).then((data) => {
            const dataSort =data.data.sort((a,b) => {
                return new Date(b.created_at) - new Date(a.created_at)
               })
                    admin.setAdminPostSort(dataSort)
        })
    }, [admin.adminPostSort])
    
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

    useEffect(() => {
       const data = post.posts.sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at)
       })
            admin.setAdminPostSort(data)

    }, [post.posts, admin.adminPostSort])

    // useEffect(() => {
    //     const token = localStorage.getItem("adminToken")
    //     if(target) {
    //         fetchAllDeviceCategory(category.selectedCategory._id, token).then(data => post.setPostSort(data.data))
    //     } else {
    //         fetchPost(token).then(data => {
    //             const sortData = data.data.sort((a,b) => {
    //                 return new Date(b.created_at) - new Date(a.created_at)
    //             })
    //             post.setPostSort(sortData)
    //         })
    //     }

    // }, [category.selectedCategory._id, target])


    return(
        <div className="scroll-table">
            <div className="adminPost__header">
                <h2>Статьи</h2>
                <button onClick={() => popup.setPopup(true)} type="button" className="btn btn-success">Добавить</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Изображение</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Просмотры</th>
                        <th>Доступные действия</th>
                    </tr>
                </thead>
            </table>	
            <div className="scroll-table-body">
                <table>
                    <tbody>
                    { admin.adminPostSort.map((post) => {
                        return(
                        <tr key={post._id}>
                            <td>{post.title}</td>
                            <td><img className="posts-image" src={process.env.REACT_APP_API_URL + post.image}/></td>
                            <td>{post.status}</td>
                            <td>{post.created_at}</td>
                            <td>{post.views}</td>
                            <td>
                            <button  onClick={() => openCategoryPopup(true, post._id)} type="button" className="btn btn-warning">Редактировать</button>                                       
                            <button onClick={() => deletePost(post._id)} type="button" className="btn btn-danger">Удалить</button> 
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
	        </div>
    <PopupPost />	
        </div>
    )
})

export default AdminPost