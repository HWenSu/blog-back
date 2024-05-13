const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = 'your_secret_key_here'

const { usersService } = require('../services')

// Define invalidatedTokens array
let invalidatedTokens = []

class UsersController {
  async login(req, res) {
    const { username, password } = req.body
    const user = await usersService.getByData(username, 'username')
    if (!user) {
      return res.status(400).json({ message: '此帳號未註冊' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: '密碼錯誤' })
    }
    const token = jwt.sign({ id: user.id }, secretKey)
    const { id, avatar, email } = user
    res.send({ token, user: { id, avatar, username, email } })
  }

  async register(req, res) {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await usersService.create({ username, email, password: hashedPassword })
    res.send(user)
  }

  async logout(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: '查無憑證' })

    // Invalidate token
    invalidatedTokens.push(token)

    res.sendStatus(200)
  }

  async getUserArticles(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: '查無憑證' })

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) return res.status(401).json({ message: '憑證驗證失敗' })
      const id = req.params.id
      const user = await usersService.getById(id, 'id', 'final')
      const articles = user.articles
      res.send({ message: '憑證驗證成功', articles })
    })
  }

  async logout(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    invalidatedTokens.push(token)
    res.sendStatus(200)
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
