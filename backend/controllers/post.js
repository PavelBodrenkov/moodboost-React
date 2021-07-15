const Post = require('./../models/post');
const NotFoundError = require('../errors/not-found-err.js');
const ForbiddenError = require('../errors/forbidden-err.js');


const getPosts = (req,res,next) => {
    Post.find({})
    .then((posts) => res.send(posts))
    .catch(next)
}

const getByCategoriesId = (req,res, next) => {
    Post.find({
        category_id: req.params.categoryId,
        // owner: req.user._id
    })
    .then((posts) => res.send(posts))
    .catch(next)
}

const getPost = (req, res, next) => {
    Post.findById(req.params.id)
    .then((post) => res.send(post))
    .catch(next)
}

const createPost = (req, res, next) => {
    const {title, seo_title, excerpt, body, slug, meta_description, meta_keywords, status, featured, views} = req.body;
    Post.create({owner: req.user._id, category:req.body.category, image: req.file ? req.file.path : '', title, seo_title, excerpt, body, slug, meta_description, meta_keywords, status, featured, views})
    .then((post) => res.status(201).send(post))
    .catch(next)
}


const deletePost = (req, res, next) => {
    Post.findById(req.params.id)
    .orFail(new NotFoundError('Пост не найден'))
    .then((post) => {
        console.log(post)
        console.log(req.user._id)
        if(req.user._id.toString() === post.owner.toString()) {
            return post.remove()
            .then(() => res.send({message: "Пост удален"}))
        }
        throw new ForbiddenError('Нельзя удалять чужие посты');
    })
    .catch(next)
}



const updatePost = (req, res, next) => {
    let date = Date.now();

    const updated = {
        category:req.body.category,
        title: req.body.title, 
        seo_title:req.body.seo_title, 
        except:req.body.except, 
        body:req.body.body, 
        slug:req.body.slug, 
        meta_description:req.body.meta_description, 
        meta_keywords:req.body.meta_keywords, 
        status:req.body.status, 
        featured:req.body.featured,
        views:req.body.views,
        updated_at: req.body.updated_at = date.getTime()/1000
    }

    if(req.file) {
        updated.image = req.file.path
    }
   
    Post.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updated},
        {new: true}
    )
    .then((post) => {
        if(post.updated_at === 0 || post.updated_at === null || post.created_at < post.updated_at) {
            post.updated_at = Date.now()
             res.send(post)
        }
    })
    .catch(next)
}


module.exports ={
    getByCategoriesId,
    createPost,
    deletePost,
    updatePost,
    getPosts,
    getPost,
}