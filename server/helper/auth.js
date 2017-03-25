var models = require('../models')
var jwt = require('jsonwebtoken')
var hash = require('password-hash')
require('dotenv').config()

module.exports = {
  signUp : (req, res, next)=> {
    models.User.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      email: req.body.email,
      fullname: req.body.fullname
    }).then(function(user){
      res.send(user)
    })
  },

  signIn : (req, res, next)=> {
    models.User.findOne({
      where:{
        username: req.body.username
      }
    }).then(function(user){
      if(!user){
        res.send('user not found')
      }
      if(hash.verify(req.body.password, user.password)){
        var token = jwt.sign({username: user.username}, process.env.SECRET, { expiresIn: '1d' });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userid: user.id,
          username: user.username
        });
      } else {
        res.send("Check Your Credentials")
      }

    })},
    verify : (req, res, next) => {
      if (req.headers.token == 'null') {
        res.json("you don't have access")
      }else{
        if (jwt.verify(req.headers.token, process.env.SECRET)) {
          next()
        }else {
          res.json("token sudah expried")
        }
      }
    },
    verifyToken : (req, res) => {
      var decoded = jwt.decode(req.body.token);
      if (req.body.token == null) {
        res.send("nothing")
      }else{
        if (decoded.username) {
          res.send("auth")
        }else {
          res.send("expired")
        }
    }
  }
}
