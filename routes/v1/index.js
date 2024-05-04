const { Router } = require('express')
const articlesRouter = require('./articles')
const router = Router()
router.use('/articles', articlesRouter)
module.exports = router
