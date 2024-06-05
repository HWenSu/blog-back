const { Router } = require('express')
const router = Router()

const { commentsController } = require('../../controllers')

router.get('/:id', commentsController.getComments)
router.post('/article/:articleId', commentsController.createComment)

module.exports = router
