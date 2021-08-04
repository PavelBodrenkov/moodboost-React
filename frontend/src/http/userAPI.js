import { $hostPost } from "./index"

export const fetchRegister = async ( name, email, password ) => {
    const user = await $hostPost.post('signup' , {name, email, password}, {
        headers: {
            "Content-Type": "application/json"
            }
    })
    return user
}

export const fetchLoginUser = async(email, password) => {
    const login = await $hostPost.post('signin',{email, password})
    return login
}

export const fetchUserMe = async(token) => {
    const userMe = await $hostPost.get('users/me', {
        headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${token}`
        }
    })
    return userMe
}