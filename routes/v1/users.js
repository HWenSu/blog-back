const { Router } = require('express')
const router = Router()

const { usersController } = require('../../controllers')

router.post('/login', usersController.login)
router.post('/register', usersController.register)
// router.post('/logout', usersController.logout)


module.exports = router