const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
router.get('/sign-In', usersController.signUpIn);
router.get('/profile', passport.checkAuthentication ,usersController.profile);

router.post('/create', usersController.create);

//Usepassport as middleware to autheticate 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) ,usersController.createSession);

router.get('/sign-out', usersController.destroySession);
module.exports = router;