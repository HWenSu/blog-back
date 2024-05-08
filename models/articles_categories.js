const articlesCategories = require('../public/data/articles_categories.json')

class ArticlesCategoriesModel {
  read() {
    return articlesCategories
  }
}

const articlesCategoriesModel = new ArticlesCategoriesModel()

module.exports = articlesCategoriesModel