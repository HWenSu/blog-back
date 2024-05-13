const Service = require('./base')

const { commentsModel, usersModel, deletedIdModel } = require('../models')

class CommentsService extends Service {
  constructor() {
    super()
    // original
    this.original = []
    // final table
    this.comments = []
    this.initialize()
  }

  async initialize() {
    // original
    this.original.push(...(await this.getOriginal()))
    // final table
    this.comments.push(...(await this.getAll()))
  }

  async getOriginal() {
    const comments = await commentsModel.read()
    return comments
  }

  async getAll() {
    // comments table
    const comments = await commentsModel.read()

    // comments table + users table
    const commentsUsers = await Promise.all(
      comments.map(async (comment) => {
        const id = comment.user
        const user = await usersModel.getById(id)
        return { ...comment, user }
      })
    )

    return commentsUsers
  }

  async getById(id, key = 'id', data = 'original', one = true) {
    data = data === 'original' ? this.original : this.comments
    const comment = one
      ? data.find((comment) => comment[key] === Number(id))
      : data.filter((comment) => comment[key] === Number(id))
    return comment
  }

  async getNextId(data) {
    const deletedId = await deletedIdModel.read()
    const deletedUsersId = deletedId.comments
    const deletedUsersMaxId = deletedUsersId.length > 0 ? Math.max(...deletedUsersId) : 0
    const dataMaxId = data.length > 0 ? data.slice(-1)[0].id : 0
    return Math.max(dataMaxId, deletedUsersMaxId) + 1
  }
}

const commentsService = new CommentsService()

module.exports = commentsService
