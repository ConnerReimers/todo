const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const {check} = require('express-validator');

router.post('/signup',
[
    check('email')
        .normalizeEmail()
        .isEmail(),

    check('password')
        .isLength({min: 5})
], usersController.signUp)

router.post('/login', usersController.login)

module.exports = router;

