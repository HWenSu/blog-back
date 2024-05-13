const fs = require('fs')
const path = require('path')

class ArticlesModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/articles.json')
    this.articles = []
    this.initialize()
  }

  async initialize() {
    this.articles.push(...(await this.read()))
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }

  async getById(id, key = 'id', one = true) {
    const articles = one
      ? this.articles.find((article) => article[key] === Number(id))
      : this.articles.filter((article) => article[key] === Number(id))
    return articles
  }
}

const articlesModel = new ArticlesModel()

module.exports = articlesModel
