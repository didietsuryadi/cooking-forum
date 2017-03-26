var express = require('express');
var router = express.Router();
var auth = require('../helper/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', auth.login)

router.post('/register', auth.register)

router.post('/verify', auth.verify)


module.exports = router;
