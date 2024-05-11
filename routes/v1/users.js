const { Router } = require('express')
const router = Router()

const { usersController } = require('../../controllers')

// router.post('/login', usersController.login)
// router.post('/register', usersController.register)
router.get('/:id/articles', usersController.getUserArticles)
// router.post('/logout', usersController.logout)


module.exports = router