import { $hostCategory, $hostPostCategory, $hostPostCategoryEmil, $hostLoginAdmin, $hostAdminMe, $hostPost } from "./index";
import jwt_decode from 'jwt-decode'


export const fetchCategory = async () => {
    const category = await $hostCategory.get('categories')
    return category
}

// export const fetchPostCategory = async (sort, name, slug, created_at, updated_at) => {
//     const postCategory = await $hostPostCategory.post('categories', {sort, name, slug, created_at, updated_at})
//     return postCategory
// }

//Создать категорию
export const fetchPostCategory = async (type) => {
    const postCategory = await $hostPostCategory.post('categories', type)
    return postCategory
}

//Выгрузить все категории с апи Эмиля
export const fetchApiEmilCategories = async() => {
    const categiry = await $hostPostCategoryEmil.get()
    return categiry
}

//Логин Админки
export const fetchLoginAdmin = async(email, password) => {
    const login = await $hostLoginAdmin.post('signinadmin',{email, password})
    return login
}

//Получить данные админа
export const fetchAdminMe = async(token) => {
    const adminMe = await $hostAdminMe.get('admins/me', {
        headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${token}`
        }
    })
    return adminMe
}

// Получить все роли с Апи
export const fetchAdminRoles = async(token) => {
    const AllAdminRole = await $hostPost.get('/roles', {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return AllAdminRole
}



