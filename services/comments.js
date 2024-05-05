const { commentsModel } = require('../models')

class CommentsService {
  async getAll() {
    const comments = await commentsModel.read()
    return comments
  }

  async getById(id) {
    const comments = await this.getAll()
    const comment = comments.find((comment) => comment.id === Number(id))
    return comment
  }

  async getByKey(key, id) {
    const comments = await this.getAll()
    const comment = comments.filter((comment) => comment[key] === Number(id))
    return comment
  }

  async getSearched(keyword) {
    const comments = await this.getAll()
    const matched = keyword
      ? comments.filter((comment) =>
          Object.values(comment).some((property) => {
            if (typeof property === 'string') {
              return property.toLowerCase().includes(keyword.toLowerCase())
            }
          })
        )
      : comments
    return matched
  }
}

const commentsService = new CommentsService()

module.exports = commentsService
