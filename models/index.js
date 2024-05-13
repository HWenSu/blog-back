const commentsModel = require('./comments')
const usersModel = require('./users')
const articlesModel = require('./articles')
const categoriesModel = require('./categories')
// enrolment
const articlesCategoriesModel = require('./articles_categories')
// deleted id
const deletedIdModel = require('./deleted_id')

module.exports = {
  articlesModel,
  categoriesModel,
  articlesCategoriesModel,
  commentsModel,
  usersModel,
  deletedIdModel
}
