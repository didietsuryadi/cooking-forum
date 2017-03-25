var express = require('express');
var router = express.Router();
var auth = require('../helper/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', auth.signIn)

router.post('/register', auth.signUp)

router.post('/verify', auth.verifyToken)


module.exports = router;
