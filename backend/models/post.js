const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    category: 
        {
            category_id: {
                type: String,
                required: true
            },
            name:{
                type:String
            },
            slug:{
                type:String
            }
        }
    ,
    title: {
        type: String,
        required:true
    },
    seo_title: {
        type: String,
        default: null
    },
    excerpt: {
        type: String,
        default:null
    },
    body: {
        type: String,
        required:true
    },
    image: {
        type:String,
        default: ''
    },
    slug: {
        type: String,
        required: true
    },
    meta_description: {
        type: String,
        default:null
    },
    meta_keywords: {
        type: String,
        default: null
    },
    status: {
        type: String, 
        required: true
    },
    featured : {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type:Date,
        default: null
    }
})

module.exports = mongoose.model('posts', postSchema)

