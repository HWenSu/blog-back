const { commentsService } = require('../services')

class CommentsController {
  async getComments(req, res) {
    const articleId = req.params.id
    const comment = await commentsService.getByKey('articleId', articleId)
    res.send(comment)
  }
}

const commentsController = new CommentsController()

module.exports = commentsController
