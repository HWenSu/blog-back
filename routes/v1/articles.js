const { Router } = require('express')
const router = Router()

const { articlesController } = require('../../controllers')

router.get('/', articlesController.getArticles)
router.post('/create', articlesController.createArticle)
router.put('/:articleId/edit', articlesController.editArticle)
router.delete('/:articleId/delete', articlesController.deleteArticle)
router.get('/:id', articlesController.getArticle)

module.exports = router
