const Comment = require('./../models/comment');

const createComment = (req, res, next) => {
    const {body, parent, post} = req.body;
    if(!parent) {
        Comment.create({body, owner: req.user._id, post})
        .then((comment) => res.status(201).send(comment))
        .catch(next)
    } else {
        Comment.findById(parent)
        .then(parent => {
            if(!parent) {
                console.log('нет родителя')
            }
            Comment.create({body, parent, owner: req.user._id, post})
            .then(comment => {
                // const children =  parent.children
                // children.push(comment._id);
                // parent.children = children
                // parent.save()
                parent.children.push(comment._id)
                parent.save()
                res.send(comment)
            })
        })
    }
}

const getComments = (req,res,next) => {
    Comment.find({post:req.params.id, parent:{$exists: false}})
    // .populate({
    //     path:'children',
    //     populate: {
    //         path:'children'
    //     }
    // })
   .then((comment) => res.send(comment))
    .catch(next)
}

const likeComment = (req, res, next) => {
    const {id} = req.body
    Comment.findByIdAndUpdate(
        id,
        {$addToSet: { likes: req.user._id }},
        { new:true }
    )
    .then((comment) => {
        if (!comment) {
            throw new NotFoundError('Нет комментария с таким id');
          }
          return res.status(200).send(comment);
    })
    .catch(next);
}

const dislikeComment = (req, res, next) => {
    const { id } = req.body;
    Comment.findByIdAndUpdate(
        id, 
        {$pull: {likes: req.user._id}},
        { new: true }
    )
    .then((comment) => {
        if (!comment) {
            throw new NotFoundError('Нет комментария с таким id');
        }
        return res.status(200).send(comment);
        })
        .catch(next);
}



module.exports ={
    createComment,
    getComments,
    likeComment,
    dislikeComment
}