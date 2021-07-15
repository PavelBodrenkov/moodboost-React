const router = require('express').Router()
const { celebrate, Joi } = require('celebrate');

const {
    getAdminMe
} = require('./../controllers/admin');

router.get('/me', getAdminMe)

module.exports = router