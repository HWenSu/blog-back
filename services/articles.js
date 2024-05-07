const Service = require('./service')
const { articlesModel } = require('../models')
const categoriesService = require('./categories.js')

class ArticlesService extends Service {
  async getAll() {
    // articles table
    const articles = await articlesModel.read()

    // articles table + categories table
    const newArticles = await Promise.all(
      articles.map(async (article) => {
        const categories = article.categories
        const articleCategories = await categoriesService.getByManyId(categories)
        return { ...article, categories: articleCategories }
      })
    )

    return newArticles
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
