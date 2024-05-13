const fs = require('fs')
const path = require('path')

class CommentsModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/comments.json')
    this.comments = []
    this.initialize()
  }

  async initialize() {
    this.comments.push(...(await this.read()))
  }
  
  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }

  async getById(id, key = 'id', one = true) {
    const comments = one
      ? this.comments.find((comment) => comment[key] === Number(id))
      : this.comments.filter((comment) => comment[key] === Number(id))
    return comments
  }
}

const commentsModel = new CommentsModel()

module.exports = commentsModel
