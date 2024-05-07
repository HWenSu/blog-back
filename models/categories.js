const categories = require('../public/data/categories.json')

class CategoriesModel {
  read() {
    return categories
  }
}

const categoriesModel = new CategoriesModel()

module.exports = categoriesModel