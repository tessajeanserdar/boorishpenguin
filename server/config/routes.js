var controllers = require ('../controllers/controllers.js');

module.exports = function(app, express) {
  app.get('/townhall/questions', controllers.readQuestions);
  app.post('/townhall/questions', controllers.writeQuestion);
  app.delete('/townhall/questions', controllers.deleteQuestion);

  app.get('/townhall/answers', controllers.readAnswers);
  app.post('/townhall/answers', controllers.writeAnswer);
  app.delete('/townhall/answers', controllers.deleteAnswer);

  app.get('/townhall/users', controllers.allUsers);
  app.post('/townhall/users', controllers.addUser);
};
