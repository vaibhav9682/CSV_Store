const express = require('express');
const router = express.Router()
const homeController = require('../controller/home_controller')



router.get('/', homeController.home);
router.get('/about', homeController.about)
router.use('/file', require('./file'))

module.exports = router