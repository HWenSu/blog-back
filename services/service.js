class Service {
  feedData(data, query) {
    const newData = {}
    newData.total = data.length
    if (query.offset && query.size) {
      const offset = Number(query.offset)
      const size = Number(query.size)
      newData.offset = offset
      newData.size = size
      newData.main = data.slice(offset, offset + size)
    } else {
      newData.main = data.slice(0, 10)
    }
    return newData
  }
}

module.exports = Service