const router = require('express').Router();
const upload = require('../middleware/upload');
const { celebrate, Joi } = require('celebrate');

const {
    createPost,
    deletePost,
    updatePost
} = require('../controllers/post');
    

router.post('/', upload.single('image'), celebrate({
    body: Joi.object().keys({
      category:Joi.object().keys({
        category_id:Joi.string().required().length(24).hex(),
        name:Joi.string().default('')
      }),
      categoryId:Joi.string().required().length(24).hex(),
      title: Joi.string().default(null),
      seo_title: Joi.string().default(null),
      except: Joi.string().default(null),
      body: Joi.string().default(null),
      image: Joi.string().default(''),
      slug: Joi.string().required(),
      meta_description: Joi.string().default(null),
      meta_keywords: Joi.string().default(null),
      status: Joi.string().required(),
      featured:Joi.number().default(0),
      views: Joi.number().default(0)
    })
}), createPost)

router.patch('/:id', upload.single('image'), celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().length(24).hex(),
      })
      .unknown(true),
    body: Joi.object().keys({
      category:Joi.object().keys({
        category_id:Joi.string().required().length(24).hex(),
        name:Joi.string().default('')
      }),
      categoryId:Joi.string().required().length(24).hex(),
      title: Joi.string().default(null),
      seo_title: Joi.string().default(null),
      except: Joi.string().default(null),
      body: Joi.string().default(null),
      image: Joi.string().default(''),
      slug: Joi.string().required(),
      meta_description: Joi.string().default(null),
      meta_keywords: Joi.string().default(null),
      status: Joi.string().required(),
      featured:Joi.number().default(0),
      views: Joi.number().default(0)
    })
}), updatePost)

router.delete('/:id', celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().length(24).hex(),
      })
      .unknown(true),
  }), deletePost)

module.exports = router;