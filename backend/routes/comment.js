const router = require('express').Router()
const { celebrate, Joi } = require('celebrate');

const {
    createComment,
    likeComment,
    dislikeComment

} = require('./../controllers/comment');

router.post('/add', celebrate({
    body: Joi.object().keys({
      body: Joi.string().required(),
      post:Joi.string().required().length(24).hex(),
      parent:Joi.string().length(24).hex(),
    }),
    }), createComment)

    router.put('/likes', celebrate({
      body: Joi.object().keys({
        id:Joi.string().required().length(24).hex(),
      })
        .unknown(true),
    }), likeComment);
  
    router.delete('/likes', celebrate({
      body: Joi.object().keys({
        id:Joi.string().required().length(24).hex(),
      })
        .unknown(true),
    }), dislikeComment);

module.exports = router