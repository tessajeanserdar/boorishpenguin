var questionControllers = require ('../controllers/questionController.js');
var answerControllers = require ('../controllers/answerController.js');
var userControllers = require ('../controllers/userControllers.js');
var courseControllers = require ('../controllers/courseControllers.js');
var tagControllers = require ('../controllers/tagControllers.js');
var passport = require('passport');


module.exports = function(app, express, ensureAuth) {
  app.get('/townhall/questions', ensureAuth, questionControllers.allQuestions);
  app.post('/townhall/questions', questionControllers.newQuestion);
  app.delete('/townhall/questions/', ensureAuth, questionControllers.deleteQuestion);

  app.get('/townhall/questions/:id', ensureAuth, questionControllers.readQuestion);
  app.post('/townhall/questions/:id', ensureAuth, questionControllers.modQuestion);

  app.post('/townhall/answers', ensureAuth, answerControllers.newAnswer);
  app.post('/townhall/answers/:id', ensureAuth, answerControllers.modAnswer);
  app.delete('/townhall/answers', ensureAuth, answerControllers.deleteAnswer);

  app.get('/townhall/users', ensureAuth, userControllers.allUsers);
  app.get('/townhall/users/:id', ensureAuth, userControllers.oneUser);
  app.post('/townhall/signup', userControllers.newUser);

  app.get('/townhall/courses', ensureAuth, courseControllers.allCourses);

  app.get('/townhall/tags', ensureAuth, tagControllers.allTags);

  app.get('/auth/google',
  passport.authenticate('google', { scope:  ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"] }));
  
  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/questions');
  });

  app.get('/user', function (req, res){
    res.json(req.user);
  });

}