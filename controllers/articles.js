const { articlesService } = require('../services')

class ArticlesController {
  async getArticle(req, res) {
    const id = req.params.id
    const article = await articlesService.getById(id)
    res.send(article)
  }

  async getArticles(req, res) {
    const keyword = req.query.search?.trim()
    const query = req.query
    const allArticles = await articlesService.getByKeyword(keyword)
    const articles = articlesService.feedData(allArticles, query)
    res.send(articles)
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
