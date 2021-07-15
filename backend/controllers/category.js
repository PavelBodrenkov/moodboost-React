const Category = require('./../models/category');
const Post = require('./../models/post');
const NotFoundError = require('../errors/not-found-err.js');
const ForbiddenError = require('../errors/forbidden-err.js');
const Admin = require('./../models/admin');
const ConflictError = require('../errors/conflict-err');
const User = require('../models/user');

const getAllCategories = (req, res, next) => {
    Category.find({})
    .then((categories) => res.send(categories))
    .catch(next)
}

const getByIdCategoryId = (req, res, next) => {
    Category.findById(req.params.id)
    .then((category) => res.send(category))
    .catch(next)
}

const deleteCategory = (req, res, next) => {
    Category.findById(req.params.id)
    .orFail(new NotFoundError('Категория не найдена'))
    .then((category) => {
     console.log(category)
        // if (req.user._id) {
            category.remove()
            res.status(200).send({ message: 'Карточка удалена' });
        // }
        // throw new ForbiddenError('Нельзя удалять чужие категории');
    })
    .catch(next)


    Post.find({category_id: req.params.id})
    .then((posts) => {
        if(posts) {
            posts.forEach((post) => {
                post.remove()
            })
            res.send({message: "Позиции из категории удалены"})
        }
    })
    .catch(next)
}

const createCategory = (req, res, next) => {
    const {sort, name, slug, created_at, updated_at} = req.body
    Category.findOne({name}) 
    .then(nameCategory => {
        if(nameCategory) {
            throw new ConflictError('Категория с таким именем уже существует');
        } else {
            Category.create({name, slug, sort, owner: req.user._id, created_at, updated_at})
            .then((category) => res.send(category))
            .catch(next)
        }
    })
    .catch(next)
    
}

const updateCategory = (req, res, next) => {
    const {sort, name, slug} = req.body
    Category.findByIdAndUpdate(
        {_id:req.params.id},
        {sort, name, slug, updated_at: req.body.updated_at = Date.now()},
        {new: true}
    )
    .then((category) => res.send(category))
    .catch(next)
}



module.exports ={
    getAllCategories,
    getByIdCategoryId,
    deleteCategory,
    createCategory,
    updateCategory
}