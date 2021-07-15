const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
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
    },
    role:{
      type:String,
      ref:'role'
    }
})

adminSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
      .then((admin) => {
        if (!admin) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }

        return bcrypt.compare(password, admin.password)
          .then((matched) => {
            if (!matched) {
              throw new UnauthorizedError('Неправильные почта или пароль');
            }
  
            return admin;
          });
      });
  };

module.exports = mongoose.model('admin', adminSchema)