const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserId,
  updateUser,
  getUserMe
} = require('./../controllers/users');

router.get('/', getUsers)

router.get('/:id', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), getUserId)

router.get('/me', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), getUserMe);

router.patch('/me', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().required().email(),
      })
      .unknown(true),
  }), updateUser);

  module.exports = router;