var models = require('../models')

module.exports = {

  downVote : (req,res)=>{
    models.Vote.destroy({
      where: {
        UserId: req.body.UserId,
        AnswerId: req.body.AnswerId
      }
    }).then(function(){
      res.send(`vote has been deleted for id ${req.body.UserId}`)
    })
  },
  upVote : (req,res)=>{
    models.Vote.findOrCreate({
      where: {
        UserId: req.body.UserId,
        AnswerId: req.body.AnswerId
      },
     defaults:{
       vote: true,
       UserId: req.body.UserId,
       AnswerId: req.body.AnswerId
     }}).then(function (vote, created) {
          res.send('ok')
      })
    }
  }
