const Service = require('./base')

const {
  articlesModel,
  categoriesModel,
  articlesCategoriesModel,
  usersModel,
  deletedIdModel
} = require('../models')

class ArticlesService extends Service {
  constructor() {
    super()
    // original
    this.original = []
    // final table
    this.articles = []
    this.initialize()
  }

  async initialize() {
    // original
    this.original.push(...(await this.getOriginal()))
    // final table
    this.articles.push(...(await this.getAll()))
  }

  async getOriginal() {
    const articles = await articlesModel.read()
    return articles
  }

  async getAll() {
    // articles table
    const articles = await articlesModel.read()

    // articles table + categories table
    const articlesCategories = await Promise.all(
      articles.map(async (article) => {
        const id = article.id
        const articleCategories = await articlesCategoriesModel.getById(id, 'article_id', false)
        const categories = await Promise.all(
          articleCategories.map(async (enrolment) => {
            const id = enrolment.category_id
            return await categoriesModel.getById(id)
          })
        )
        return { ...article, categories }
      })
    )
    // articles table + users table
    const articlesUsers = await Promise.all(
      articlesCategories.map(async (article) => {
        const id = article.user
        const user = await usersModel.getById(id)
        return { ...article, user }
      })
    )

    return articlesUsers
  }

  async getById(id, key = 'id', data = 'original', one = true) {
    data = data === 'original' ? this.original : this.articles
    const article = one
      ? data.find((article) => article[key] === Number(id))
      : data.filter((article) => article[key] === Number(id))
    return article
  }

  async getByKeyword(keyword, filter) {
    const matched = keyword
      ? this.articles.filter((article) => this.articleMatches(article, keyword, filter))
      : this.articles
    return matched
  }

  articleMatches(article, keyword, filter) {
    article = article[filter] || article
    return Object.values(article).some((property) => this.propertyMatches(property, keyword))
  }

  propertyMatches(property, keyword) {
    if (typeof property === 'string') {
      return property.toLowerCase().includes(keyword.toLowerCase())
    } else if (Array.isArray(property)) {
      return property.some((item) => this.propertyMatches(item, keyword))
    } else if (typeof property === 'object') {
      return Object.values(property).some((value) => this.propertyMatches(value, keyword))
    }
    return false
  }

  async create(data) {
    data.id = await this.getNextId(this.original)
    this.original.push(data)
    await articlesModel.write(this.original)
    return data
  }

  async getNextId(data) {
    const deletedId = await deletedIdModel.read()
    const deletedUsersId = deletedId.articles
    const deletedUsersMaxId = deletedUsersId.length > 0 ? Math.max(...deletedUsersId) : 0
    const dataMaxId = data.length > 0 ? data.slice(-1)[0].id : 0
    return Math.max(dataMaxId, deletedUsersMaxId) + 1
  }
}

const articlesService = new ArticlesService()

module.exports = articlesService
