const Service = require('./base')

const { encodeImageToBase64 } = require('../utils')

const { usersModel, articlesModel, deletedIdModel } = require('../models')

// 端口（使用 Zeabur 的 PORT 或本地預設 5000）
const port = process.env.PORT || 5000;

class UsersService extends Service {
  constructor() {
    super()
    // original
    this.original = []
    // final table
    this.users = []
    this.initialize()
  }

  async initialize() {
    // original
    this.original.push(...(await this.getOriginal()))
    // final table
    this.users.push(...(await this.getAll()))
  }

  async getOriginal() {
    const users = await usersModel.read()
    return users
  }

  async getAll() {
    // users table
    const users = await usersModel.read()

    // users table + articles table
    const usersArticles = await Promise.all(
      users.map(async (user) => {
        const id = user.id
        const articles = await articlesModel.getById(id, 'user', false)
        return { ...user, articles }
      })
    )
    return usersArticles
  }

  async getById(id, key = 'id', data = 'original', one = true) {
    data = data === 'original' ? this.original : this.users
    const user = one
      ? data.find((user) => user[key] === Number(id))
      : data.filter((user) => user[key] === Number(id))
    return user
  }

  async getByData(data, key) {
    const user = this.original.find((user) => user[key] === data)
    return user
  }

  async create(data) {
    data.id = await this.getNextId(this.original)
    data.avatar = `${port}/img/guest.png`
    this.original.push(data)
    await usersModel.write(this.original)
    return data
  }

  async update(data) {
    const id = data.id
    this.original.map((user) => {
      if (user.id === id) {
        user = data
        return { ...user }
      }
      return user
    })
    await usersModel.write(this.original)
  }

  async getNextId(data) {
    const deletedId = await deletedIdModel.read()
    const deletedUsersId = deletedId.users
    const deletedUsersMaxId = deletedUsersId.length > 0 ? Math.max(...deletedUsersId) : 0
    const dataMaxId = data.length > 0 ? data.slice(-1)[0].id : 0
    return Math.max(dataMaxId, deletedUsersMaxId) + 1
  }
}

const usersService = new UsersService()

module.exports = usersService
