const Service = require('./base')

const { categoriesModel, deletedIdModel } = require('../models')

class CategoriesService extends Service {
  constructor() {
    super()
    // original
    this.original = []
    // final table
    this.categories = []
    this.initialize()
  }

  async initialize() {
    // original
    this.original.push(...(await this.getOriginal()))
    // final table
    this.categories.push(...(await this.getAll()))
  }

  async getOriginal() {
    const categories = await categoriesModel.read()
    return categories
  }

  async getAll() {
    const categories = await categoriesModel.read()
    return categories
  }

  async getById(id, key = 'id', data = 'original', one = true) {
    data = data === 'original' ? this.original : this.articles
    const category = one
      ? data.find((category) => category[key] === Number(id))
      : data.filter((category) => category[key] === Number(id))
    return category
  }

  async getNextId(data) {
    const deletedId = await deletedIdModel.read()
    const deletedUsersId = deletedId.categories
    const deletedUsersMaxId = deletedUsersId.length > 0 ? Math.max(...deletedUsersId) : 0
    const dataMaxId = data.length > 0 ? data.slice(-1)[0].id : 0
    return Math.max(dataMaxId, deletedUsersMaxId) + 1
  }
}

const categoriesService = new CategoriesService()

module.exports = categoriesService
