require('../models');
var express = require('express');
var {login,register} = require('../helpers/auth');
var router = express.Router();

router.post('/register',register);
router.post('/login',login)

module.exports = router;
