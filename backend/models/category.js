const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    sort: {
        type:Number,
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    userRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type:Date,
        default: null
    }
})

module.exports = mongoose.model('categories', categorySchema)