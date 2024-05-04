const articlesService = require('../services')

class ArticlesController {
  async getAllArticles(req, res) {
    const articles = await articlesService.getAll()
    res.send(articles)
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
