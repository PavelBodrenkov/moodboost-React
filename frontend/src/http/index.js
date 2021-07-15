import axios from 'axios'

const $hostPost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const $hostCategory = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $hostPostsEmil = axios.create({
    baseURL: process.env.REACT_APP_EMIL_URL_POSTS
})

const $hostPostCategory = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $hostPostCategoryEmil = axios.create({
    baseURL: process.env.REACT_APP_EMIL_URL_CATEGORY
})

const $hostLoginAdmin = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const $hostAdminMe = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})









// const $authHost = axios.create({

// })

export {
    $hostPost,
    $hostCategory,
    $hostPostsEmil,
    $hostPostCategory,
    $hostPostCategoryEmil,
    $hostLoginAdmin,
    $hostAdminMe,    
}