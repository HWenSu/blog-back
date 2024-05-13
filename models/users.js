const fs = require('fs')
const path = require('path')

class UsersModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/users.json')
    this.users = []
    this.initialize()
  }

  async initialize() {
    this.users.push(...(await this.read()))
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }

  async getById(id, key = 'id', one = true) {
    const users = one
      ? this.users.find((user) => user[key] === Number(id))
      : this.users.filter((user) => user[key] === Number(id))
    return users
  }
}

const usersModel = new UsersModel()

module.exports = usersModel
