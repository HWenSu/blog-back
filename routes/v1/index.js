const { Router } = require('express')
const articlesRouter = require('./articles')
const commentsRouter = require('./comments')
const router = Router()
router.use('/articles', articlesRouter)
router.use('/comments', commentsRouter)
module.exports = router
