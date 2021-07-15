const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err.js');
const ConflictError = require('../errors/conflict-err');
const User = require('./../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
    User.find({})
    .then((users) => res.send(users))
    .catch(next)
}

const getUserId = (req, res, next) => {
    const {id} = req.params
    User.findById(id)
    .then((user) => {
        if(!user) {
            throw new NotFoundError('Нет пользователя с таким id');
        } else {
            res.send(user)
        }
    })
    .catch(next)
}

const createUser =(req, res, next) => {
    const {name, email, password} = req.body
    User.findOne({email})
    .then((user) => {
        if (user) {
            throw new ConflictError('Пользователь с таким email уже существует');
        }
    })
    .catch(next)
    bcrypt.hash(password, 10)
    .then((hash) => {
        User.create({
            name, email, password:hash
        })
        .then((user) => res.send({
            _id:user._id,
            name:user.name,
            email: user.email
        }))
        .catch(next)
    })
    .catch(next)
}


const login = (req, res, next) => {
    const {email, password} = req.body
    return User.findUserByCredentials(email, password)
    .then((user) => {
        //создание токена
        const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' });
          res.send({ token });
    })
    .catch((err) => {
        throw new NotAuthorizedError(err.message);
      })
    .catch(next);
}

const updateUser = (req, res, next) => {
    const { name, email } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          throw new ConflictError('Пользователь с таким email уже существует');
        }
      })
      .catch(next);
    User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        throw new NotFoundError('Нет пользователя с таким id');
      })
      .then((user) => res.send(user))
      .catch(next);
  };

  const getUserMe = (req, res, next) => {
    const { _id } = req.user;
    return User.findById({ _id })
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Нет пользователя с таким id');
        }
        res.send(user);
      })
      .catch(next);
  };

  module.exports = {
    getUsers,
    getUserId,
    createUser,
    login,
    updateUser,
    getUserMe
  }