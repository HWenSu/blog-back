const { Router } = require('express')
const router = Router()

const { commentsController } = require('../../controllers')

router.get('/:id', commentsController.getComments)
// router.get('/', commentsController.getSearchedComments)
// router.get('/:id', commentsController.getComment)

module.exports = router
