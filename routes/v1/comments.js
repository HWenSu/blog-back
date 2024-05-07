const { Router } = require('express')
const router = Router()

const { commentsController } = require('../../controllers')

router.get('/:id', commentsController.getComments)

module.exports = router
