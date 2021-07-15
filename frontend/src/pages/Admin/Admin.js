import React from "react"
import './Admin.scss'
import { Link, useLocation, useHistory } from 'react-router-dom';
import AdminRole from "./AdminRole/AdminRole";
import AdminCategory from './AdminCategory/AdminCategory';
import {ADMIN_ROLE_ROURE, ADMIN_CATEGORY_ROUTE, ADMIN_POST_ROUTE} from '../../utils/consts'
import AdmonPost from './AdminPost/AdminPost';

const Admin = () => {
    const location = useLocation()
    const history = useHistory()
    
    function exitAdmin() {
        localStorage.removeItem('adminToken')
        history.push('/')
    }

    return(
        <div className="admin">
            <div className="navBar-container">
                <div className="admin__Logo">MOODBOOST</div>
                <div className="admin__navBar">
                <Link to={ADMIN_ROLE_ROURE} className="admin__navBar_link">Роли</Link>
                <Link to="#" className="admin__navBar_link">Пользователи</Link>
                <Link to={ADMIN_POST_ROUTE} className="admin__navBar_link">Статьи</Link>
                <Link to={ADMIN_CATEGORY_ROUTE} className="admin__navBar_link">Категории</Link>
                <Link to="#" onClick={() => exitAdmin()} className="admin__navBar_link">Выйти</Link>
                </div>
            </div>
            {location.pathname === (ADMIN_ROLE_ROURE) && <AdminRole />}
            {location.pathname === (ADMIN_CATEGORY_ROUTE) && <AdminCategory />}
            {location.pathname === (ADMIN_POST_ROUTE) && <AdmonPost />}
        </div>
    )
}

export default Admin