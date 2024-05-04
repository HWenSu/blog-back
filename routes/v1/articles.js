const { Router } = require('express')
const router = Router()

const articlesController = require('../../controllers')

router.get('/', articlesController.getArticles)
router.get('/:id', articlesController.getArticle)

module.exports = router

