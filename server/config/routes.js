var questionControllers = require ('../controllers/questionController.js');
var answerControllers = require ('../controllers/answerController.js');
var userControllers = require ('../controllers/userControllers.js');
var courseControllers = require ('../controllers/courseControllers.js');
var tagControllers = require ('../controllers/tagControllers.js');
var resourceControllers = require('../controllers/resourceController.js');
var passport = require('passport');


module.exports = function(app, express, ensureAuth) {
  app.get('/townhall/questions', ensureAuth, questionControllers.allQuestions);
  app.post('/townhall/questions', ensureAuth, questionControllers.newQuestion);
  app.delete('/townhall/questions/:id', ensureAuth, questionControllers.deleteQuestion);

  app.get('/townhall/activity/:id', ensureAuth, questionControllers.allActivityForUser);
  app.get('/townhall/questions/:id', ensureAuth, questionControllers.readQuestion);
  // app.get('/townhall/classQuestions/:list', ensureAuth, questionControllers.questionsForUsersCourses);
  app.post('/townhall/questions/:id', ensureAuth, questionControllers.modQuestion);

  app.get('/townhall/answers', questionControllers.allAnswers);
  app.post('/townhall/answers', ensureAuth, answerControllers.newAnswer);
  app.post('/townhall/answers/:id', ensureAuth, answerControllers.modAnswer);
  app.delete('/townhall/answers/:id', ensureAuth, answerControllers.deleteAnswer);

  app.get('/townhall/resources', ensureAuth, resourceControllers.allResources);
  app.post('/townhall/resources', ensureAuth, resourceControllers.newResource);
  // app.post('/townhall/resources/:id', ensureAuth, questionControllers.modAnswer);
  // app.delete('/townhall/resources/:id', ensureAuth, questionControllers.deleteQuestion);

  app.get('/townhall/users',  userControllers.allUsers);//add ensure Auth
  app.get('/townhall/users/:id',  userControllers.oneUser);  //add ensure Auth
  app.post('/townhall/signup', userControllers.newUser);

  app.get('/townhall/courses', ensureAuth, courseControllers.allCourses);
  app.post('/townhall/courses', ensureAuth, courseControllers.createCourse);
  // app.get('/townhall/courses/:id', ensureAuth, courseControllers.allCoursesForUser);
  app.get('/townhall/courses/:id', ensureAuth, courseControllers.allUsersCourses);
  
  app.post('/townhall/CourseUsers', ensureAuth, courseControllers.addUser);
  app.get('/townhall/courseInfo/:id', ensureAuth, courseControllers.courseQuestions);

  app.get('/townhall/tags', ensureAuth, tagControllers.allTags);
  app.post('/townhall/tags', ensureAuth, tagControllers.createTag);

  // Client does get request to /auth/google on signin
  app.get('/auth/google',
  passport.authenticate('google', { scope:  ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"] }));

  // Server.js:38 sends get req to /auth/google/callback after user has successfully logged into google
  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log("successfully authenticated")
    // sends user to questions page after they successfully login
    res.redirect('https://afternoon-fjord-60393.herokuapp.com/#/questions');
  });

  app.get('/user', ensureAuth, function (req, res){
    // sends google user data to client so they can know whose currenty logged in
    res.json(req.user);
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

}
