const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const UnauthorizedError = require('../errors/authorized-err.js');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Поле обязательно для заполнения'],
        minlength: [2, 'Введите не менее двух символов'],
        unique: true
    },
    email: {
        type:String,
        required: [true, 'Поле обязательно для заполнения'],
        unique: true,
        validate: {
            validator: (v) => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v),
            message: 'Введите корректный email',
          },
    },
    password: {
        type: String,
        required: [true, 'Поле обязательно для заполнения'],
        minlength: [6, 'Введите не менее шести символов'],
        select: false
    }
})

userSchema.statics.findUserByCredentials = function (email, password) {
  
    return this.findOne({ email }).select('+password')
   
      .then((user) => {
        if (!user) {
          throw new UnauthorizedError('Incorrect email or password');
        }

        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new UnauthorizedError('Incorrect email or password');
            }
  
            return user;
          });
      });
  };

module.exports = mongoose.model('users', userSchema)