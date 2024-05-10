const Service = require('./service')
const { commentsModel } = require('../models')
const usersService = require('./users.js')

class CommentsService extends Service {
  constructor() {
    super()
    this.comments = []
    this.initialize()
  }

  async initialize() {
    this.comments.push(...await this.getAll())
  }

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
    const comment = one
      ? this.comments.find((comment) => comment[key] === Number(id))
      : this.comments.filter((comment) => comment[key] === Number(id))
    return comment
  }
}

const commentsService = new CommentsService()

module.exports = commentsService
