const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = 'your_secret_key_here'

const { usersService } = require('../services')

class UsersController {
  async login(req, res) {
    const { username, password } = req.body
    res.send('login')
  }

  async register(req, res) {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await usersService.create({ username, email, password: hashedPassword })
    res.send(`註冊成功, 用戶ID: ${user.id}`)
  }

  async TESTregister(req, res) {
    const { username, email, password } = req.body
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Save user to database (pseudocode)
    const user = await User.create({ username, email, password: hashedPassword })
    // Generate JWT
    const token = jwt.sign({ id: user.id }, 'your_secret_key')
    // Send token to client
    res.json({ token })
  }

  async TESTlogin(req, res) {
    const { email, password } = req.body
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id }, 'your_secret_key')
    // Send token to client
    res.json({ token })
  }

  protect(req, res) {
    res.json({ message: 'Protected route', user: req.user })
  }

  verifyToken(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      req.user = decoded
      next()
    })
  }
}

const usersController = new UsersController()

module.exports = usersController
