const Service = require('./service')
const { articlesModel } = require('../models')

class ArticlesService extends Service {
  async getAll() {
    const articles = await articlesModel.read()
    return articles
  }

  async getById(id, key = 'id', one = true) {
    const articles = await this.getAll()
    const article = one
      ? articles.find((article) => article[key] === Number(id))
      : articles.filter((article) => article[key] === Number(id))
    return article
  }

  async getByKeyword(keyword) {
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
