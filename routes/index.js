const express = require('express');

const router = express.Router();

//home controller path
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));

module.exports = router;