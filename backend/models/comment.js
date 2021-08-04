const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate')
const Post = require('./post')


const commentSchema = mongoose.Schema({
   body:{
       type:String,
       required:true
   },
   post:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'posts'
   },
   parent:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'comment'
   },
   owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'users',
     autopopulate: true
   },
   likes:[
    {
        type: mongoose.Schema.Types.ObjectId,
        default:[]
    }
    ],
   children:[
       {
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment',
        autopopulate: true
       }
   ],
//    create_at: {
//        type:Date,
//        default: Date.now
//    }
},
{
    timestamps: true
}
)

commentSchema.pre('save', async function(next) {
    if(this.isNew) {
        await Post.inCommentCount(this.post)
    }
    next()
})

commentSchema.plugin(autopopulate)

module.exports = mongoose.model('comment', commentSchema)