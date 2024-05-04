const articles = require('../public/data/articles.json')

class ArticlesModel {
  read() {
    return articles
  }
}

const articlesModel = new ArticlesModel()

module.exports = articlesModel
