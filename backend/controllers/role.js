const Role = require('../models/role')

const createRole = (req, res, next) => {
    const {value} = req.body
    Role.create({value})
    .then(role => res.send(role))
    .catch(next)
}

const getAllRoles = (req, res, next) => {
    Role.find({})
    .then(data => res.send(data))
    .catch(next)
}

module.exports ={
    createRole,
    getAllRoles
}