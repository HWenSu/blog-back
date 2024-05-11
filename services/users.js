const Service = require('./service')
const fs = require('fs')
const path = require('path')

const { usersModel, articlesModel, deletedIdModel } = require('../models')

class UsersService extends Service {
  constructor() {
    super()
    this.original = []

    this.articles = []

    this.users = []
    this.initialize()
  }

  async initialize() {
    this.original.push(...(await this.getOriginal()))
    this.articles.push(...(await articlesModel.read()))
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
        const articlesData = await this.getById(this.articles, id, 'user', false)
        return { ...user, articles: articlesData }
      })
    )

    return usersArticles
  }

  async getUserById(id, key = 'id', data = 'original', one = true) {
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
    data.avatar = 'http://localhost:5000/img/guest.png'
    this.original.push(data)
    await usersModel.write(this.original)
    return data
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
