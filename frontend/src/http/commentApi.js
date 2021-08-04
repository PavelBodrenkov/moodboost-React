import { $hostPost } from "./index"

export const fetchComment = async (body, post, token) => {
    const comment = await $hostPost.post('comments/add', {body, post}, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return comment
}

export const fetchCommentAnswer = async (body, parent, post, token) => {
    const comment = await $hostPost.post('comments/add', {body, parent, post}, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return comment
}

export const fetchAllComment = async (id) => {
    const comment = await $hostPost.get('comments/' + id)
    return comment
}

export const fetchAddLikeComment = async(id, token) => {
    const data = await $hostPost.put('comments' + '/likes', {id}, {
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
            }
    })
    return data
}

export const fetchDeleteLikeComment = async(id, token) => {
    
    const data = await $hostPost.delete('comments' + '/likes', {data:{id: id}, 
        headers: { 
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`} 
        })
    return data
}
