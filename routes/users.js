var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('responding at Localhost:3000/users');
});

/* GET users listing. */
router.get('/cool', function(req, res, next) {
  res.send('You are so cool');
});

module.exports = router;
