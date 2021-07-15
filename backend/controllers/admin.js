const Admin = require('./../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err.js');
const ConflictError = require('../errors/conflict-err');
const Role = require('../models/role')

const { NODE_ENV, JWT_SECRET } = process.env;

const loginAdmin = (req, res, next) => {
    const {email, password} = req.body
    return Admin.findUserByCredentials(email, password)
    .then((user) => {
        console.log(user)
        //создание токена
        const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' });
          res.send({ token, user });
    })
    .catch((err) => {
        // throw new NotAuthorizedError(err.message);
        console.log(err)
      })
    .catch(next);
}

const createAdmin =(req, res, next) => {
    const { email, password } = req.body
    Admin.findOne({email})
    .then((admin) => {
        if (admin) {
            throw new ConflictError('Пользователь с таким email уже существует');
        }
    })
    .catch(next)
    Role.findOne({value:"ADMIN"})
    .then(role => {
        bcrypt.hash(password, 10)
        .then((hash) => {
            Admin.create({
                 email, password:hash, role:role.value
            })
            .then((admin) => res.send({
                _id:admin._id,
                email: admin.email,
                role: admin.role
            }))
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
   
}



const getAdminMe = (req, res, next) => {
    const { _id } = req.user;
    return Admin.findById({ _id })
      .then((admin) => {
        if (!admin) {
          throw new NotFoundError('Нет пользователя с таким id');
        }
        res.send(admin);
      })
      .catch(next);
  };

module.exports = {
    createAdmin,
    loginAdmin,
    getAdminMe
  }