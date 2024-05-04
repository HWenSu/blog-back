const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const version = 1

app.use(cors())

const router = require('./routes')
app.use(router)

app.listen(port, () => {
  console.log(`http://localhost:${port}/v${version}/articles/home`)
})
