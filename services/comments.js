const Service = require('./service')
const { commentsModel } = require('../models')
const usersService = require('./users.js')

class CommentsService extends Service {
  async getAll() {
    // comments table
    const comments = await commentsModel.read()

    // comments table + users table
    const commentsUsers = await Promise.all(
      comments.map(async (comment) => {
        const id = comment.user
        const userData = await usersService.getById(id)
        return { ...comment, user: userData }
      })
    )

    return commentsUsers
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
