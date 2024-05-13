const fs = require('fs')
const path = require('path')

class CategoriesModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/categories.json')
    this.categories = []
    this.initialize()
  }

  async initialize() {
    this.categories.push(...(await this.read()))
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }

  async getById(id, key = 'id', one = true) {
    const category = one
      ? this.categories.find((category) => category[key] === Number(id))
      : this.categories.filter((category) => category[key] === Number(id))
    return category
  }
}

const categoriesModel = new CategoriesModel()

module.exports = categoriesModel
