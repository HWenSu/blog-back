const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = 'your_secret_key_here'

const { articlesService } = require('../services')

class ArticlesController {
  async getArticle(req, res) {
    const id = req.params.id
    const article = await articlesService.getById(id, 'id', 'final')
    res.send(article)
  }

  async getArticles(req, res) {
    const query = req.query
    const keyword = query.keyword?.trim()
    const filter = query.filter

    const allArticles = await articlesService.getByKeyword(keyword, filter)
    const articles = articlesService.feedData(allArticles, query)

    res.send(articles)
  }

  createArticle(req, res) {
    const { user, title, content } = req.body
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No token provided' })

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Failed to authenticate token' })
      const article = await articlesService.create({ user, title, content })
      res.send({ message: 'Token authenticated', user: decoded, article })
    })
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
