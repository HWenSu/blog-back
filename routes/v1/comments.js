const { Router } = require('express')
const router = Router()

const { commentsController } = require('../../controllers')

router.get('/:id', commentsController.getComments)
router.post('/user/article/:articleId', commentsController.createComment)

module.exports = router
