const articlesService = require('./articles')
const categoriesService = require('./categories')
const articlesCategoriesService = require('./articles_categories')

const commentsService = require('./comments')
const usersService = require('./users')

module.exports = { articlesService, categoriesService, articlesCategoriesService, commentsService, usersService }
