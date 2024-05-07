// 引用模組
const express = require('express')
const cors = require('cors')
// express專案取名app
const app = express()
// 端口
const port = 5000
// 版本
const version = 1

// 中間件: 跨來源資源共用
app.use(cors())
// 中間件: 路由器
const router = require('./routes')
app.use(router)

// 監聽伺服器
app.listen(port, () => {
  console.log(`http://localhost:${port}/v${version}/articles/home`)
})
