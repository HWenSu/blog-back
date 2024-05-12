const fs = require('fs')
const path = require('path')

class CommentsModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/comments.json')
  }
  
  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }
}

const commentsModel = new CommentsModel()

module.exports = commentsModel
