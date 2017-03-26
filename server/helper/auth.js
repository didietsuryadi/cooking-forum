var User = require('../models/user.js');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
require('dotenv').config()
var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {

  login: function(req, res, next) {
    User.findOne({username: req.body.username}, function(err,user){
      if(err){
        res.json(err)
      }
      else if(user){
        if(passwordHash.verify(req.body.password, user.password)){
          var token = jwt.sign({username: user.username}, process.env.SECRET, { expiresIn: '1d' });
          res.json({
            token: token,
            userid: user._id,
            username: user.username
          });
        }
      }else{
        res.send('Check Your Credentials')
      }
    })
  },

  register: function(req, res, next) {
    if (!valid.test(req.body.email)) {
      res.send('Invalid Email Address!')
    } else if (!req.body.username) {
      res.send('Username is Required!')
    } else if (!req.body.name) {
      res.send('Name is Required')
    } else if (!req.body.password) {
      res.send('Password is Required')
    } else {
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      email: req.body.email
    }, function (err,data) {
      if(err){
        res.send('Check Field Again')
      }else{
        res.json(data)
      }
    })
  }
  },
  verify: function(req, res, next){
    if (req.headers.token == null) {
      res.json("you don't have access")
    }else{
      if (jwt.verify(req.headers.token, process.env.SECRET)) {
        next()
      }else {
        res.json("token was expried")
      }
    }
  }
}
