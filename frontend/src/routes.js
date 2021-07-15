import { 
    ADMIN_ROUTE, 
    LIFE_ROUTE, 
    LOGIN_ROUTE, 
    MAINPOSTS_ROUTE, 
    POST_ROUTE, 
    REGISTER_ROUTE, 
    SEARCH_ROUTE, 
    LOGIN_ADMIN_ROUTE, 
    ADMIN_ROLE_ROURE, 
    ADMIN_CATEGORY_ROUTE, 
    ADMIN_POST_ROUTE 
} from "./utils/consts"

import Admin from './pages/Admin/Admin'
import AdminRoles from './pages/Admin/AdminRole/AdminRole'
import AdminCategory from './pages/Admin/AdminCategory/AdminCategory'
import LoginAdmin from "./pages/Admin/LoginAdmin/LoginAdmin"
import Login from './pages/Login/Login'
import Register from "./pages/Register"
import MainPosts from "./pages/MainPosts"
import Post from "./pages/Post/Post"
import Life from "./pages/Life"
import Search from "./pages/Search"
import AdminPost from './pages/Admin/AdminPost/AdminPost';


export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component: Login
    },
    {
        path:REGISTER_ROUTE,
        Component: Register
    },
    {
        path:MAINPOSTS_ROUTE,
        Component: MainPosts
    },
    {
        path:POST_ROUTE + '/:id',
        Component: Post
    },
    {
        path:LIFE_ROUTE,
        Component: Life
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    }
]

export const AdminRout = [
    {
        path:ADMIN_ROUTE,
        Component: Admin
    },
    {
        path:LOGIN_ADMIN_ROUTE,
        Component: LoginAdmin
    },
    {
        path:ADMIN_ROLE_ROURE,
        Component: AdminRoles
    },
    {
        path:ADMIN_CATEGORY_ROUTE,
        Component: AdminCategory
    },
    {
        path:ADMIN_POST_ROUTE,
        Component: AdminPost
    }
]