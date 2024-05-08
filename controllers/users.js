const { usersService } = require('../services')

class UsersController {
  loginTest(req, res) {
    res.send('login')
  }

  registerTest(req, res) {
    res.send('register')
  }
}

const usersController = new UsersController()

module.exports = usersController