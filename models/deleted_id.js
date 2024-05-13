const fs = require('fs')
const path = require('path')

class DeletedIdModel {
  constructor() {
    this.filePath = path.join(__dirname, '../public/data/deleted_id.json')
    this.deletedId = []
    this.initialize()
  }

  async initialize() {
    this.deletedId.push(await this.read())
  }

  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }
}

const deletedIdModel = new DeletedIdModel()

module.exports = deletedIdModel