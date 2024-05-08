const { Router } = require('express')
const router = Router()

const { usersController } = require('../../controllers')

router.post('/login', usersController.loginTest)
router.post('/register', usersController.registerTest)


module.exports = router