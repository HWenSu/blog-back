const { commentsService } = require('../services')

class CommentsController {
  async getComments(req, res) {
    const id = req.params.id
    const query = req.query
    const allComments = await commentsService.getById(id, 'articleId', false)
    const comments = commentsService.feedData(allComments, query)
    res.send(comments)
  }
}

const commentsController = new CommentsController()

module.exports = commentsController
