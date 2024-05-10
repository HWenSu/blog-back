const fs = require('fs')
const path = require('path')

const { usersModel, deletedIdModel } = require('../models')

class UsersService {
  constructor() {
    this.users = []
    this.initialize()
  }

  async initialize() {
    this.users.push(...await this.getAll())
  }

  async getAll() {
    const users = await usersModel.read()
    return users
  }

  async getById(id, key = 'id', one = true) {
    const users = await this.getAll()
    const user = one
      ? this.users.find((user) => user[key] === Number(id))
      : this.users.filter((user) => user[key] === Number(id))
    return user
  }

  async getByData(data, key) {
    const users = await this.getAll()
    const user = this.users.find((user) => user[key] === data)
    return user
  }

  async create(data) {
    data.id = await this.getNextId(this.users)
    data.avatar = 'https://i.imgur.com/c5to1C3.png'
    this.users.push(data)
    await usersModel.write(this.users)
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
