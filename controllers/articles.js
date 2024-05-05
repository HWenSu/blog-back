const articlesService = require('../services')

class ArticlesController {
  // async getArticles(req, res) {
  //   const articles = await articlesService.getAll()
  //   res.send(articles)
  // }

  async getArticle(req, res) {
    const id = req.params.id
    const article = await articlesService.getById(id)
    res.send(article)
  }

  async getSearchedArticles(req, res) {
    const keyword = req.query.search
    const articles = await articlesService.getSearched(keyword)
    res.send(articles)
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
