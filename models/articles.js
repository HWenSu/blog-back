// const articles = require('../public/data/articles.json')

// class ArticlesModel {
//   read() {
//     return articles
//   }
// }

// const articlesModel = new ArticlesModel()

// module.exports = articlesModel

const fs = require('fs')
const path = require('path')

class ArticlesModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/articles.json')
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }
}

const articlesModel = new ArticlesModel()

module.exports = articlesModel
