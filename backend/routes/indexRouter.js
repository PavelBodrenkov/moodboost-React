const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');
const postRouter = require('./post');
const categoryRouter = require('./categories');
const userRouter = require('./users');
const adminRouter = require('./admin')
const errorRoutes = require('./error.js');
const { requestLogger, errorLogger } = require('../middleware/logger');
const { login, createUser } = require('../controllers/users');
const {loginAdmin, createAdmin, } = require('../controllers/admin')
const roleRouter = require('./roles')

const {getPosts, getPost, getByCategoriesId} = require('../controllers/post');
const { getAllCategories} = require('./../controllers/category');

router.use(requestLogger); // подключаем логгер запросов

// router.post('/signup', celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(8),
//       name: Joi.string().required().min(2).max(30),
//     }),
//   }), createUser);

//   router.post('/signin', celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(8),
//     }),
//   }), login);

  router.post('/signinadmin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }), loginAdmin);

  router.post('/signupadmin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
      role: Joi.string().default('USER')
    }),
  }), createAdmin);


router.get('/posts', getPosts)
router.get('/categories', getAllCategories)

router.get('/posts/post/:id', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), getPost)

router.get('/posts/:categoryId', celebrate({
  params: Joi.object()
    .keys({
      categoryId: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), getByCategoriesId)


router.use(auth);
router.use('/posts', postRouter)
router.use('/roles', roleRouter)
router.use('/categories', categoryRouter)
router.use('/admins', adminRouter)
router.use('/users', userRouter)
router.use('/', errorRoutes);

router.use(errorLogger);// подключаем логгер ошибок
module.exports = router