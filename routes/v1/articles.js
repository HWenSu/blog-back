const { Router } = require('express')
const router = Router()

const articlesController = require('../../controllers')

router.get('/', articlesController.getAllArticles)

module.exports = router

