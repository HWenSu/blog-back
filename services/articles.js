const Service = require('./service')
const { articlesModel, categoriesModel, usersModel, deletedIdModel } = require('../models')

const categoriesService = require('./categories.js')
const articlesCategoriesService = require('./articles_categories.js')
const usersService = require('./users.js')

class ArticlesService extends Service {
  constructor() {
    super()
    this.original = []

    this.categories = []
    this.users = []

    this.articles = []
    this.initialize()
  }

  async initialize() {
    this.original.push(...(await this.getOriginal()))

    this.categories.push(...(await categoriesModel.read()))
    this.users.push(...(await usersModel.read()))

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
        const idData = await articlesCategoriesService.getById(id, 'article_id', false)
        const categoriesData = await categoriesService.getByManyId(idData)
        return { ...article, categories: categoriesData }
      })
    )

    // articles table + users table
    const articlesUsers = await Promise.all(
      articlesCategories.map(async (article) => {
        const id = article.user
        const userData = await usersService.getById(this.users, id)
        return { ...article, user: userData }
      })
    )

    return articlesUsers
  }

  async getById(id, key = 'id', one = true) {
    const article = one
      ? this.articles.find((article) => article[key] === Number(id))
      : this.articles.filter((article) => article[key] === Number(id))
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
