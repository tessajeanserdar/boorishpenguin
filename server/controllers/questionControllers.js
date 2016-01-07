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

      questions = {};
      questions.results = formattedQs;
      res.json(questions);
    });
  },

  newQuestion: function(req, res) {
    var txt = req.body.text;
    var uname = req.body.username;
    var coursename = req.body.course;
    var tagname = req.body.tag;

    db.User.findOrCreate({
      where: {
        username: uname
      }
    })
    .spread(function(user, created) {
      db.Course.findOrCreate({
        where: {
          name: coursename
        }
      })
      .spread(function(course, created) {
        db.Tag.findOrCreate({
          where: {
            name: tagname
          }
        })
        .spread(function(tag, created) {
          db.Question.create({
            text: txt,
            UserId: user.get('id'),
            CourseId: course.get('id'),
            TagId: tag.get('id')
          })
          .then(function(message) {
            res.sendStatus(201);
          });
        });
      });
    });
  },

  // TODO: add check for admin or same-user
  deleteQuestion: function(req, res) {
    db.Question.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(id) {
      if (id) {
        res.sendStatus(204);
      };
    });
  },

  readQuestion: function(req, res) {
    var qid = req.params.id;
    db.Question.findAll({
      where: {
        id: qid
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
          QuestionId: qid
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

  // TODO: add check for admin or same-user
  modQuestion: function(req, res) {
    var qid = req.params.id;
    var mod = req.body.mod;

    db.Question.findAll({
      where: {
        id: qid
      }
    })
    .then(function(questions) {
      var curGood = questions[0].isGood;
      var curLike = questions[0].points;
      var curClosed = questions[0].isClosed;
      var curAnswered = questions[0].isAnswered;
    });

    // anybody can like; doesn't need auth
    if (mod === 'like') {
      db.Question.update({
        points: curLike + 1
      }, {
        where: {
          id: qid
        }
      })
      .then(function() {
        res.sendStatus(201);
      })
    } else if (mod === 'good') {
      // admin only
      db.Question.update({
        isGood: !curGood
      }, {
        where: {
          id: qid
        }
      })
      .then(function() {
        res.sendStatus(201);
      });
    } else if (mod === 'closed') {
      // admin only; maybe refactor this and the previous
      // to run the admin check first?
      db.Question.update({
        isClosed: !curClosed
      }, {
        where: {
          id: qid
        }
      })
      .then(function() {
        res.sendStatus(201);
      });
    } else if (mod === 'answered') {
      // same-user only
      db.Question.update({
        isAnswered: !curAnswered
      }, {
        where: {
          id: qid
        }
      })
      .then(function() {
        res.sendStatus(201);
      })
    }
  }
};
