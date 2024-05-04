const articlesService = require('../services')

class ArticlesController {
  async getArticles(req, res) {
    const articles = await articlesService.getAll()
    res.send(articles)
  }

  async getArticle(req, res) {
    const articleId = req.params.id
    const article = await articlesService.getById(articleId)
    res.send(article)
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
