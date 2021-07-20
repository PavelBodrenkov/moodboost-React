import React, { useEffect, useContext } from "react"
import './AdminRole.scss'
import { Link, useHistory } from 'react-router-dom';
import './AdminRole.scss'
import {fetchAdminRoles, fetchAdminMe} from '../../../http/adminAPI';
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import {ADMIN_ROLE_ROURE} from './../../../utils/consts';

const AdminRole = observer(() => {
const {admin} = useContext(Context)
const history = useHistory()
    // Проверка токена
    // useEffect(() => {
    //     tokenCheck()
    // }, [history])

    // function tokenCheck()  {
    //     if(localStorage.getItem("adminToken")) {
    //         const token = localStorage.getItem("adminToken")
    //         if(token) {
    //             fetchAdminMe(token).then(res => {
    //                 if(res) {
    //                     console.log(res)
    //                     history.push(ADMIN_ROLE_ROURE)
    //                     admin.setIsAuth(true)
    //                     console.log('прошло')
    //                 } else {
    //                     console.log('не прошло')
    //                 }
    //             })
    //             .catch((err) => console.log(err));
    //         }
    //      }
    // }



    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchAdminRoles(token).then(roles => admin.setRoles(roles.data))
    }, [])

console.log(localStorage.getItem("adminToken"))
    return(
        // <div className="adminRole">
        //     <div className="adminRole__container">
        //         <div className="adminRole__header">
        //             <h2>Роли</h2>
        //             <button type="button" className="btn btn-success">Добавить</button>
        //             <button type="button" className="btn btn-danger">Удалить</button>
        //         </div>
        //         <div className="role-container">
        //                 <div className="role_block">
        //                     <div className="adminRole__wrapper">
        //                         <div className="adminRole__name">
        //                                 <p>Имя</p>
        //                                 <p>Отображаемое имя</p>
        //                         </div>
        //                         <p>Доступные действия</p>
        //                     </div>
                           
        //                         {admin.roles.length !== 0 && admin.roles.map((role) => {
        //                             return(
        //                                 <div className="adminRole__wrapper" key={role.value}>
        //                                 <div className="adminRole__name">
        //                                         <p>{role.value}</p>
        //                                         <p>{role.value}</p>
        //                                 </div>
        //                                 <p>Доступные действия</p>
        //                             </div>
        //                             )
        //                         })}
                            
        //                 </div>
        //         </div>
        //     </div>
           
        // </div>
        <div className="scroll-table">
            <div className="adminPost__header">
                <h2>Роли</h2>
                <button type="button" className="btn btn-success">Добавить</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Отображаемое имя</th>
                        <th>Доступные действия</th>
                    </tr>
                </thead>
            </table>	
            <div className="scroll-table-body">
                <table>
                    <tbody>
                    { admin.roles.length !== 0 && admin.roles.map((role) => {
                        return(
                        <tr key={role._id}>
                            <td>{role.value}</td>
                            <td>{role.value}</td>
                            <td>
                            <button  type="button" className="btn btn-warning">Редактировать</button>
                            <button  type="button" className="btn btn-danger">Удалить</button>                                  
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
	        </div>
        </div>
    )
})

export default AdminRole