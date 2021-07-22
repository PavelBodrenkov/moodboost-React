const Post = require('./../models/post');
const NotFoundError = require('../errors/not-found-err.js');
const ForbiddenError = require('../errors/forbidden-err.js');
const sharp  = require('sharp')
const moment = require('moment');
const path = require('path')
const fs = require("fs");

const getPosts = (req,res,next) => {
    Post.find({})
    .then((posts) => res.send(posts))
    .catch(next)
}

const getByCategoriesId = (req,res, next) => {
    Post.find({
         categoryId: req.params.categoryId,
        //  owner: req.user._id
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
    const {title, seo_title, excerpt, body, slug, meta_description, meta_keywords, status, featured, views, categoryId} = req.body;
     let compressorImage
   if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    compressorImage = path?.join(__dirname, '../', 'storage', '/', 'posts', req.file?.originalname?.split('.').slice(0, -1).join('.') + "-" + 'cropped' + '.png')
   } else {
    compressorImage = path?.join(__dirname, '../', 'storage', '/', 'posts', req.file?.originalname?.split('.').slice(0, -1).join('.') + "-" + 'cropped' + '.jpg')
   }

     if(req.file) {
        sharp(req.file?.path).resize(640).jpeg({
            quality:80,
            chromaSubsampling:'4:4:4'
        }).toFile(compressorImage)
     }

    Post.create({owner: req.user._id, category:req.body.category, categoryId, image: req.file ? req.file.path : '', title, seo_title, excerpt, body, slug, meta_description, meta_keywords, status, featured, views})
    .then((post) => res.status(201).send(post))
    .catch(next)
}

const deletePost = (req, res, next) => {
    Post.findById(req.params.id)
    .orFail(new NotFoundError('Пост не найден'))
    .then((post) => {
        if(req.user._id.toString() === post.owner.toString()) {
            
            fs.unlink(post.image, (err) => {
                if (err) {
                  console.error(err);
                }
                console.log("File removed");
              });
              if(post.image.split('.').slice(0, -1).join('.') + "-" + 'cropped'+'.jpg') {
                fs.unlink(post.image.split('.').slice(0, -1).join('.') + "-" + 'cropped'+'.jpg', (err) => {
                    if (err) {
                      console.error(err);
                    }
                    console.log("File removed");
                  });
              }

              if(post.image.split('.').slice(0, -1).join('.') + "-" + 'cropped'+'.png') {
                fs.unlink(post.image.split('.').slice(0, -1).join('.') + "-" + 'cropped'+'.png', (err) => {
                    if (err) {
                      console.error(err);
                    }
                    console.log("File removed");
                  });
              }
             return post.remove()
            .then(() => res.send({message: "Пост удален"}))
        }
        throw new ForbiddenError('Нельзя удалять чужие посты');
    })
    .catch(next)
}

const updatePost = (req, res, next) => {
    const updated = {
        category:req.body.category,
        categoryId: req.body.categoryId,
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
        updated_at: req.body.updated_at = Date.now()
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