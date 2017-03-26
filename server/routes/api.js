var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var forumController = require('../controllers/forumController')
var commentController = require('../controllers/commentController')
var voteController = require('../controllers/voteController')

//User Router
router.get('/user', userController.findAllUser);

router.get('/user/:id', userController.findUserById);

router.post('/user', userController.createUser);

router.put('/user/:id', userController.updateUser);

router.delete('/user/:id', userController.deleteUser);


//Forum router
router.get('/forum', forumController.findAllForum);

router.get('/forum/:id', forumController.findForumById);

router.post('/forum', forumController.createForum);

router.put('/forum/:id', forumController.updateForum);

router.delete('/forum/:id', forumController.deleteForum);

//Comment Router
router.get('/comment', commentController.findAllComment);

router.get('/comment/:id', commentController.findCommentById);

router.post('/comment', commentController.createComment);

router.put('/comment/:id', commentController.updateComment);

router.delete('/comment/:id', commentController.deleteComment);

//Vote Router
router.post('/upvote', voteController.upVote);

router.post('/downvote', voteController.downVote);

module.exports = router;
