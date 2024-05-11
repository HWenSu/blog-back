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

  async getById(table, id, key = 'id', one = true) {
    const result = one
      ? table.find((data) => data[key] === Number(id))
      : table.filter((data) => data[key] === Number(id))
    return result
  }

  // async getByManyId(ids) {
  //   const categories = await Promise.all(
  //     ids.map(async (id) => {
  //       const category = await this.getById(id)
  //       return category
  //     })
  //   )
  //   return categories
  // }
}

module.exports = Service