var db = require('../db/index.js');

module.exports = {
  allQuestions: function(req, res) {
    console.log('request to get all question')
    db.Question.findAll({include: [db.User, db.Course, db.Tag]})
    .then(function(questions) {
      formattedQs = questions.map(function(question) {
        return {
          id: question.id,
          text: question.text,
          points: question.points,
          responses: question.responses,
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

    db.User.findOne({
      where: {
        username: uname
      }
    })
    .then(function(user) {
      user.update({
        points: user.get('points') + 1
      })
      .then(function() {
        db.Course.findOne({
          where: {
            name: coursename
          }
        })
        .then(function(course) {
          db.Tag.findOne({
            where: {
              name: tagname
            }
          })
          .then(function(tag) {
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
      })
    });
  },

  // TODO: add check for admin or same-user
  deleteQuestion: function(req, res) {
    var qid = req.params.id;

    db.Question.findOne({
      where: {
        id: qid
      }
    })
    .then(function(question) {
      db.User.findOne({
        where: {
          id: question.get('UserId')
        }
      })
      .then(function(){
        // MAKE CHECK AROUND THIS CHAIN HERE
        question.destroy()
        .then(function(id) {
          if (id) {
            res.sendStatus(204);
          };
        });
        // END CHAIN
      })
    }) 
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
          responses: question.responses,
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

    db.Question.findOne({
      where: {
        id: qid
      }
    })
    .then(function(question) {
      var curGood = question.isGood;
      var curLike = question.points;
      var curClosed = question.isClosed;
      var curAnswered = question.isAnswered;

      db.User.findOne({
        where: {
          id: question.get('UserId')
        }
      })
      .then(function(user) {
        // anybody can like; doesn't need auth
        if (mod === 'like') {
          question.update({
            points: curLike + 1
          })
          .then(function() {
            return user.update({
              points: user.get('points') + 1
            })
          })
          .then(function() {
            res.sendStatus(201);
          });
        } else if (mod === 'good') {
          // admin only
          question.update({
            isGood: !curGood
          })
          .then(function() {
            return user.update({
              points: user.get('points') + 1
            })
          })
          .then(function() {
            res.sendStatus(201);
          });
        } else if (mod === 'closed') {
          // admin only; maybe refactor this and the previous
          // to run the admin check first?
          question.update({
            isClosed: !curClosed
          })
          .then(function() {
            res.sendStatus(201);
          });
        } else if (mod === 'answered') {
          // same-user only
          question.update({
            isAnswered: !curAnswered
          })
          .then(function() {
            res.sendStatus(201);
          })
        }
      });
    });
  }
};
