const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/sign-In', usersController.signUpIn);
router.get('/profile', usersController.profile);

router.post('/create', usersController.create);

module.exports = router;