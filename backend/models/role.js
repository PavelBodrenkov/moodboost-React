const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
   value: {
    type:String,
    unique: true,
    default: "USER"
   }
})

module.exports = mongoose.model('role', roleSchema)
