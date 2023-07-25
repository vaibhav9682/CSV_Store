const express = require('express');
const router = express.Router()
const fileController = require('../controller/file_Controller')
const multer = require('multer')
const upload = multer()

router.post('/upload', upload.single('csvFile'), fileController.upload)
router.get('/dashboard', fileController.dashboard)
router.get('/delete/:id', fileController.delete)
router.get('/data/:id', fileController.dataSheet)

module.exports = router
