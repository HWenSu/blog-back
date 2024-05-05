const comments = require('../public/data/comments.json')

class CommentsModel {
  read() {
    return comments
  }
}

const commentsModel = new CommentsModel()

module.exports = commentsModel