const { Router } = require('express')
const router = Router()

const timestamp = require('../../utils')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, timestamp() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

const { usersController } = require('../../controllers')

router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.post('/logout', usersController.logout)
router.post('/upload', upload.single('file'), usersController.upload)
router.get('/:id/articles', usersController.getUserArticles)

module.exports = router
