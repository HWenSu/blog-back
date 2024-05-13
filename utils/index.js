const fs = require('fs')
const path = require('path')

function timestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

function encodeImageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath)
  return imageBuffer.toString('base64')
}

function imageFolder(id) {
  const folderPath = path.join(__dirname, `../public/uploads/${id}`)
  fs.mkdirSync(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err)
      return
    }
    console.log('Directory created successfully')
  })
}

module.exports = { timestamp, encodeImageToBase64, imageFolder }
