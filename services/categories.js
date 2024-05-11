const Service = require('./service')
const { categoriesModel } = require('../models')

class CategoriesService extends Service {
  constructor() {
    super()
    this.categories = []
    this.initialize()
  }

  async initialize() {
    this.categories.push(...await this.getAll())
  }

  async getAll() {
    const categories = await categoriesModel.read()
    return categories
  }

  async getById(id, key = 'id', one = true) {
    const category = one
      ? this.categories.find((category) => category[key] === Number(id))
      : this.categories.filter((category) => category[key] === Number(id))
    return category
  }

  async getByManyId(ids) {
    const categories = await Promise.all(
      ids.map(async (id) => {
        const category = await this.getById(id)
        return category
      })
    )
    return categories
  }
}

const categoriesService = new CategoriesService()

module.exports = categoriesService
