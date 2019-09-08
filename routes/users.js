const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/sign-In', usersController.signUpIn);

module.exports = router;