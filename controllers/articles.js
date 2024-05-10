const { articlesService } = require('../services')

class ArticlesController {
  async getArticle(req, res) {
    const id = req.params.id
    const article = await articlesService.getById(id)
    res.send(article)
  }

  async getArticles(req, res) {
    const query = req.query
    const keyword = query.keyword?.trim()
    const filter = query.filter

    const allArticles = await articlesService.getByKeyword(keyword, filter)
    const articles = articlesService.feedData(allArticles, query)

    res.send(articles)
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
