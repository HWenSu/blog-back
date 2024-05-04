const express = require('express')
const app = express()
const port = 5000

app.get('/home', (req, res) => {
  res.send('Home page')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/home`)
})
