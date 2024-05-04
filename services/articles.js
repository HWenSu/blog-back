const articlesModel = require('../models')

class ArticlesService {
  async getAll() {
    const articles = await articlesModel.read()
    return articles
  }
}

const articlesService = new ArticlesService()

module.exports = articlesService
