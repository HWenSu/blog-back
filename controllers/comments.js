const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = 'your_secret_key_here'

const { commentsService } = require('../services')

class CommentsController {
  async getComments(req, res) {
    const id = req.params.id
    const query = req.query
    const allComments = await commentsService.getById(id, 'articleId', 'final', false)
    const comments = commentsService.feedData(allComments, query)
    res.send(comments)
  }

  async createComment(req, res) {
    const { userId, articleId } = req.params

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: '查無憑證' })

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) return res.status(401).json({ message: '憑證驗證失敗' })
      const comment = await commentsService.create({ user: Number(userId), articleId: Number(articleId), comment: req.body.comment })
      res.send({ message: '留言成功', user: decoded, comment })
    })
  }
}

const commentsController = new CommentsController()

module.exports = commentsController
