var models = require('../models')

module.exports = {
  findAllAnswer : (req,res)=>{
    models.Answer.findAll({
      include: [
        {
          model: models.Question,
          model: models.User,
          include: [
            {
              model: models.Vote
            }
          ]
        }
      ]
    }).then(answers => {
      res.send(answers)
    })
  },
  findAnswerById : (req,res)=>{
    models.Answer.findById(req.params.id).then(function (user) {
      res.send(user)
    })
  },
  findAnswerByQuestionId : (req,res)=>{
    models.Answer.findById(req.params.id).then(function (user) {
      res.send(user)
    })
  },
  deleteAnswer : (req,res)=>{
    models.Answer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(){
      res.send(`data has been deleted for id ${req.params.id}`)
    })
  },
  updateAnswer : (req,res)=>{
    models.Answer.update({
      content:req.body.content,
      updateAt: new Date()
    }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    })
    .then(function (result) {
      console.log(result);
      res.send(result[1]);
    });
  },
  createAnswer : (req,res)=>{
    models.Answer.create(
      {content:req.body.content,
        UserId: req.body.UserId,
        QuestionId: req.body.QuestionId
      }).then(function (user) {
        res.send(user)
      })
    }
  }
