const router = require('express').Router();
const {
    createRole,
    getAllRoles
  } = require('./../controllers/role');


router.post('/role', createRole)
router.get('/', getAllRoles)

module.exports = router;