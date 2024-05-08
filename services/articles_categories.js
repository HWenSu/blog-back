const { articlesCategoriesModel } = require('../models')

class ArticlesCategoriesService {
  async getAll() {
    const articlesCategories = await articlesCategoriesModel.read()
    return articlesCategories
  }

  async getById(id, key = 'id', one = true) {
    const enrollments = await this.getAll()
    const enrollment = one
      ? enrollments.find((category_id) => category_id[key] === Number(id))
      : enrollments.filter((category_id) => category_id[key] === Number(id))
    return enrollment.map((object)=> object.category_id)
  }
}

const articlesCategoriesService = new ArticlesCategoriesService()

module.exports = articlesCategoriesService
