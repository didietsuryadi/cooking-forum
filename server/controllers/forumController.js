var models = require('../models')

module.exports = {
  findAllQuestion : (req,res)=>{
    models.Question.findAll({
      include: [
        {
          model: models.User,
          include: [
            {
              model: models.Answer,
              include: [
                {
                  model:models.Vote
                }
              ]
            }
          ]
        },
        {
          model: models.Answer
        }
      ]
    }).then(questions => {
      res.send(questions)
    })
  },
  findQuestionById : (req,res)=>{
    models.Question.findById(req.params.id, {
      include: [
        {
          model: models.Answer,
          include: [
            {
              model: models.User
            },
            {
              model: models.Vote,
              include: [
                {
                  model:models.User
                }
              ]
            }
          ]
        }
      ]
    }).then(function (user) {
      res.send(user)
    })
  },
  deleteQuestion : (req,res)=>{
    models.Question.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(){
      res.send(`data has been deleted for id ${req.params.id}`)
    })
  },
  updateQuestion : (req,res)=>{
    models.Question.update({
      title: req.body.title,
      content: req.body.content
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
  createQuestion : (req,res)=>{
    models.Question.create(
      {title: req.body.title,
       content: req.body.content,
        UserId: req.body.UserId
      }).then(function (user) {
        res.send(user)
      })
    }
  }
