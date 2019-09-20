const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/sign-in', usersController.signUpIn);
router.get('/profile', usersController.profile);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);

module.exports = router;