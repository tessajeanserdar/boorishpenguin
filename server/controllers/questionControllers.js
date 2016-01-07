var db = require('../db/index.js');

module.exports = {
  allQuestions: function(req, res) {
    db.Question.findAll({include: [db.User, db.Course, db.Tag]})
    .then(function(questions) {
      formattedQs = questions.map(function(question) {
        return {
          id: question.id,
          text: question.text,
          points: question.points,
          isAnswered: question.isAnswered,
          isGood: question.isGood,
          isClosed: question.isClosed,
          createdAt: question.createdAt,
          coursename: question.Course.name,
          tagname: question.Tag.name,
          user: question.User.name
        }
      });

      questions = {}
      questions.results = formattedQs;
      res.json(questions);
    });
  },

  newQuestion: function(req, res) {
    console.log('new question received', req.body);
  },

  deleteQuestion: function() {
    console.log('request to delete question received');
  },

  readQuestion: function(req, res) {
    var qid = req.params.id;
    db.Question.findAll({
      where: {
        id: qid;
      },
      include: [db.User, db.Course, db.Tag]
    })
    .then(function(questions) {
      formattedQs = questions.map(function(question) {
        return {
          id: question.id,
          text: question.text,
          points: question.points,
          isAnswered: question.isAnswered,
          isGood: question.isGood,
          isClosed: question.isClosed,
          createdAt: question.createdAt,
          coursename: question.Course.name,
          tagname: question.Tag.name,
          user: question.User.name
        }
      });

      db.Answer.findAll({
        where: {
          QuestionId: qid;
        },
        include: [db.User]
      })
      .then(function(answers) {
        formattedAs = answers.map(function(answer) {
          return {
            id: answer.id,
            text: answer.text,
            points: answer.points,
            answersQuestion: answer.answersQuestion,
            isGood: answer.isGood,
            QuestionId: qid,
            user: question.User.name,
            createdAt: answer.createdAt
          }
        });

        qAndAs = {};
        qAndAs.results = formattedQs.concat(formattedAs);
        res.send(qAndAs);
      })
    })
  },

  modQuestion: function() {
    console.log('post request to modify a question received');
  }
};
