const articlesModel = require('../models')

class ArticlesService {
  async getAll() {
    const articles = await articlesModel.read()
    return articles
  }

  async getById(id) {
    const articles = await this.getAll()
    const article = articles.find((article) => article.id === Number(id))
    return article
  }
}

const articlesService = new ArticlesService()

module.exports = articlesService
