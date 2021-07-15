const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default:'Новый пользователь'
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
        required: [true, 'Поле обязательно для заполнения']
    }
})

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }

        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new UnauthorizedError('Неправильные почта или пароль');
            }
  
            return user;
          });
      });
  };

module.exports = mongoose.model('users', userSchema)