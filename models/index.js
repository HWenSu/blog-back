const articlesModel = require('./articles')
const categoriesModel = require('./categories')
const articlesCategoriesModel = require('./articles_categories')

const commentsModel = require('./comments')
const usersModel = require('./users')

const deletedIdModel = require('./deleted_id')

module.exports = {
  articlesModel,
  categoriesModel,
  articlesCategoriesModel,
  commentsModel,
  usersModel,
  deletedIdModel
}
