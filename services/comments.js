const Service = require('./service')
const { commentsModel } = require('../models')

class CommentsService extends Service{
  async getAll() {
    const comments = await commentsModel.read()
    return comments
  }

  async getById(id, key = 'id', one = true) {
    const comments = await this.getAll()
    const comment = one
      ? comments.find((comment) => comment[key] === Number(id))
      : comments.filter((comment) => comment[key] === Number(id))
    return comment
  }
}

const commentsService = new CommentsService()

module.exports = commentsService
