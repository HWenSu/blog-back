const { Router } = require('express')

const articlesRouter = require('./articles')
const commentsRouter = require('./comments')
const usersRouter = require('./users')

const router = Router()

router.use('/articles', articlesRouter)
router.use('/comments', commentsRouter)
router.use('/users', usersRouter)

module.exports = router
