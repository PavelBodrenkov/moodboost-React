const router = require('express').Router()
const { celebrate, Joi } = require('celebrate');

const {
    getAllCategories,
    getByIdCategoryId,
    deleteCategory,
    createCategory,
    updateCategory
} = require('./../controllers/category');



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
      parent_id:Joi.string().default(null),
      name_parent:Joi.string().default(null),
      sort: Joi.number().default(0),
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
      sort: Joi.number().default(0),
      name: Joi.string().required(),
      slug: Joi.string().required(),
      parent_id:Joi.string().default(null),
      name_parent:Joi.string().default(null)
    })
  }), updateCategory)

module.exports = router