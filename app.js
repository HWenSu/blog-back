// 引用模組
const express = require('express')
const cors = require('cors')

// HTTPS
// const https = require('https')
// const fs = require('fs')
// const privateKey = fs.readFileSync('./private.key', 'utf8')
// const certificate = fs.readFileSync('./sign-certificate.crt', 'utf8')
// const publicKey = fs.readFileSync('./public.key', 'utf8')
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: publicKey
// }

// express專案取名app
const app = express()
// 端口（使用 Zeabur 的 PORT 或本地預設 5000）
const port = process.env.PORT || 5000;
// 版本
const version = 1

// 配置 CORS，允許特定來源
const corsOptions = {
  origin: 'https://elva-blog.zeabur.app', // 允許的前端來源
  optionsSuccessStatus: 200 // 處理舊版瀏覽器
};
app.use(cors(corsOptions));

// 中間件: 解析 JSON 格式的請求主體
app.use(express.json())
// 中間件: 
app.use(express.static('public'))
// 中間件: 路由器
const router = require('./routes')
app.use(router)

// HTTPS
// const httpsServer = https.createServer(credentials, app)
// httpsServer.listen(443, () => {
//   console.log(`https://localhost:443/v${version}/articles/home`)
// })

// 監聽伺服器
app.listen(port, () => {
  console.log(`http://localhost:${port}/v${version}/articles`)
})

