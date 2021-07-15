const router = require('express').Router()
const { celebrate, Joi } = require('celebrate');

const {
    getAllCategories,
    getByIdCategoryId,
    deleteCategory,
    createCategory,
    updateCategory
} = require('./../controllers/category');

router.get('/', getAllCategories)

router.get('/:id', celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().length(24).hex(),
      })
      .unknown(true),
  }), getByIdCategoryId)

router.delete('/:id', celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().length(24).hex(),
      })
      .unknown(true),
  }), deleteCategory)

router.post('/', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      slug: Joi.string().required(),
      sort: Joi.number(),
      created_at:Joi.date().default(new Date),
      updated_at:Joi.date().default(null)
    }),
    }), createCategory)

router.patch('/:id', celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().length(24).hex(),
      })
      .unknown(true),
    body: Joi.object().keys({
      sort: Joi.number(),
      name: Joi.string().required(),
      slug: Joi.string().required()})
  }), updateCategory)

module.exports = router