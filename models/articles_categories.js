const fs = require('fs')
const path = require('path')

class ArticlesCategoriesModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/articles_categories.json')
    this.articlesCategories = []
    this.initialize()
  }

  async initialize() {
    this.articlesCategories.push(...(await this.read()))
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }

  async getById(id, key = 'article_id', one = true) {
    const articlesCategories = one
      ? this.articlesCategories.find((enrolment) => enrolment[key] === Number(id))
      : this.articlesCategories.filter((enrolment) => enrolment[key] === Number(id))
    return articlesCategories
  }
}

const articlesCategoriesModel = new ArticlesCategoriesModel()

module.exports = articlesCategoriesModel
