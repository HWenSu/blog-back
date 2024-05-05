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

  async getSearched(keyword) {
    const articles = await this.getAll()
    const matched = keyword
      ? articles.filter((article) =>
          Object.values(article).some((property) => {
            if (typeof property === 'string') {
              return property.toLowerCase().includes(keyword.toLowerCase())
            }
          })
        )
      : articles
    return matched
  }
}

const articlesService = new ArticlesService()

module.exports = articlesService
