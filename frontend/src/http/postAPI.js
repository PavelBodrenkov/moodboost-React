import { $hostPost, $hostPostsEmil } from "./index"


export const fetchPost = async (token) => {
    const post = await $hostPost.get('posts' , {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return post
}

export const fetchOneDevice = async (id, token) => {
    const data = await $hostPost.get('posts' + "/post" +"/" + id, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return data
}

export const fetchAllDeviceCategory = async(id, token) => {
    const data = await $hostPost.get('posts' + '/' + id, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return data
}

export const fetchApiEmil = async() => {
    const posts = await $hostPostsEmil.get()
    return posts
}

export const fetchCreatePost = async(type, token) => {
    const data = await $hostPost.post('posts', type, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return data
}

export const fetchDeletePost = async(id, token) => {
    const data = await $hostPost.delete('posts' + '/' + id ,{
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return data
}

export const fetchEditPost = async(id, type, token) => {
    const data = await $hostPost.patch('posts' + '/' + id , type, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return data
}


