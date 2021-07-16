const router = require('express').Router();
const upload = require('../middleware/upload');
const { celebrate, Joi } = require('celebrate');

const {
    getByCategoriesId,
    createPost,
    deletePost,
    updatePost,
    getPosts,
    getPost,
    
} = require('../controllers/post');

router.get('/', getPosts)

router.get('/:categoryId', celebrate({
    params: Joi.object()
      .keys({
        categoryId: Joi.string().required().length(24).hex(),
      })
      .unknown(true),
  }), getByCategoriesId)

  router.get('/post/:id', getPost)
    // params: Joi.object()
    //   .keys({
    //     id: Joi.string().required().length(24).hex(),
    //   })
    //   .unknown(true),
   



router.post('/', upload.single('image'), celebrate({
    body: Joi.object().keys({
      category:Joi.object().keys({
        category_id:Joi.string().required(),
        name:Joi.string()
      }),
      title: Joi.string().required(),
      seo_title: Joi.string().default(null),
      except: Joi.string().default(null),
      body: Joi.string().required(),
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
        name:Joi.string()
      }),
      title: Joi.string().required(),
      seo_title: Joi.string().default(null),
      except: Joi.string().default(null),
      body: Joi.string().required(),
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