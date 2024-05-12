const fs = require('fs')
const path = require('path')

class CategoriesModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/categories.json')
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }
}

const categoriesModel = new CategoriesModel()

module.exports = categoriesModel
