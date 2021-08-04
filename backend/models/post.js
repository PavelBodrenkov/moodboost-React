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
                type:String,
                default:null
            },
            slug:{
                type:String,
                default: null
            }
        },
    categoryId: {
        type: String,
        required: true
    },
    commentCount: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: null
    },
    seo_title: {
        type: String,
        default: null
    },
    excerpt: {
        type: String,
        default:null
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            default:[]
        }
    ],
    body: {
        type: String,
        default: null
    },
    image: {
        type:String,
        default: null
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
    },
   
},
// {
//     timestamps: true
// }
)

postSchema.statics = {
    inCommentCount(postId) {
        return this.findByIdAndUpdate(
            postId,
            {$inc: {commentCount: 1}},
            {new: true}
        )
    }
}




module.exports = mongoose.model('posts', postSchema)

