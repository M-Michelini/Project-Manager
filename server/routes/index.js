var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("landing.html",{root:'./views'});
});

module.exports = router;
