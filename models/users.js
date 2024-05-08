const users = require('../public/data/users.json')

class UsersModel {
  read() {
    return users
  }
}

const usersModel = new UsersModel()

module.exports = usersModel