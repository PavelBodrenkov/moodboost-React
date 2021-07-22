import { $hostCategory, $hostPostCategory, $hostPostCategoryEmil } from "./index";

//Выгрузить все категории
export const fetchCategory = async (token) => {
    const category = await $hostCategory.get('categories', {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return category
}

// export const fetchPostCategory = async (sort, name, slug, created_at, updated_at) => {
//     const postCategory = await $hostPostCategory.post('categories', {sort, name, slug, created_at, updated_at})
//     return postCategory
// }
//Создать категорию
export const fetchPostCategory = async (name, slug, parent_id, name_parent, token) => {
    const postCategory = await $hostPostCategory.post('categories', {name, slug, parent_id, name_parent}, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }     
    }
    )
    return postCategory
}

//Выгрущить категории Эмиля
export const fetchApiEmilCategories = async() => {
    const categiry = await $hostPostCategoryEmil.get()
    return categiry
}

//Удалить категорию
export const fetchDeleteCategory = async(id, token) => {
    const category = await $hostCategory.delete('categories' + '/' + id , {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return category
}

//Редактировать категорию
export const fetchEditCategory = async(id, name, slug, parent_id, name_parent, token) => {
    const category = await $hostCategory.patch('categories' + '/' + id, {name, slug, parent_id, name_parent}, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return category
}

export const fetchOneCategory = async(id, token) => {
    const category = await $hostCategory.get('categories' + '/' + id, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return category
}

