require('../models');
var express = require('express');
var {login,register,ensureCorrectUser,deleteUser} = require('../helpers/auth');
var router = express.Router({mergeParams:true});

router.post('/auth/register',register);
router.post('/auth/login',login);
router.delete('/auth/:_id',ensureCorrectUser,deleteUser)

module.exports = router;
