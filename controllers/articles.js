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
    const { title, content } = req.body
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: '查無憑證' })

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) return res.status(401).json({ message: '憑證驗證失敗' })
      const user = decoded.id
      const article = await articlesService.create({ user, title, content })
      res.send({ message: '新增文章成功', article })
    })
  }

  editArticle(req, res) {
    const { title, content } = req.body
    const { articleId } = req.params
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: '查無憑證' })

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) return res.status(401).json({ message: '憑證驗證失敗' })
      const user = decoded.id
      const article = await articlesService.update({ id: Number(articleId), user, title, content })
      res.send({ message: '編輯文章成功', article })
    })
  }

  deleteArticle(req, res) {
    const { articleId } = req.params
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: '查無憑證' })

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) return res.status(401).json({ message: '憑證驗證失敗' })
      await articlesService.delete(Number(articleId))
      res.send({ message: '刪除文章成功' })
    })
  }
}

const articlesController = new ArticlesController()

module.exports = articlesController
