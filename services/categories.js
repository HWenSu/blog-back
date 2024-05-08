const { categoriesModel } = require('../models')

class CategoriesService {
  async getAll() {
    const categories = await categoriesModel.read()
    return categories
  }

  async getById(id, key = 'id', one = true) {
    const categories = await this.getAll()
    const category = one
      ? categories.find((category) => category[key] === Number(id))
      : categories.filter((category) => category[key] === Number(id))
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
