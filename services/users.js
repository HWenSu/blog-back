const { usersModel } = require('../models')

class UsersService {
  async getAll() {
    const users = await usersModel.read()
    return users
  }

  async getById(id, key = 'id', one = true) {
    const users = await this.getAll()
    const comment = one
      ? users.find((comment) => comment[key] === Number(id))
      : users.filter((comment) => comment[key] === Number(id))
    return comment
  }
}

const usersService = new UsersService()

module.exports = usersService