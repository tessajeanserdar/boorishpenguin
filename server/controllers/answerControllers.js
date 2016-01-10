var db = require('../db/index.js');

module.exports = {
  newAnswer: function(req, res) {
    var txt = req.body.text;
    var uname = req.body.person;
    var qid = req.body.id_Question;

    db.Question.findById(qid)
    .then(function(question) {
      if (!question.isClosed) {
        question.update({
          responses: question.responses + 1;
        })
        .then(function() {
          return db.User.findOne({
            where: {
              username: uname,
            }
          })
        })
        .then(function(user) {
          db.Answer.create({
            text: txt,
            UserId: user.get('id'),
            QuestionId: qid
          })
          .then(function(answer) {
            user.update({
              points: user.get('points') + 1
            })
            .then(function() {
              res.status(201).json(answer);
            });
          });
        });
      } else {
        res.sendStatus(404);
      }
    });
  },

  // TODO: 'good' needs admin auth 
  modAnswer: function(req, res) {
    var aid = req.params.id;
    var mod = req.body.mod;

    db.Answer.findOne({
      where: {
        id: aid
      }
    })
    .then(function(answer) {
      var uid = answer.get('UserId');

      db.User.findOne({
        where: {
          id: uid
        }
      })
      .then(function(user) {
        if (mod === 'good') {
          // DO YOUR ADMIN AUTH CHECK AROUND THIS PROMISE CHAIN
          answer.update({
            isGood: !answer.get('isGood')
          })
          .then(function(answer) {
            if (answer.get('isGood')) {
              return user.update({
                points: user.get('points') + 1
              })
            } else {
              return user.update({
                points: user.get('points') - 1
              })
            }
          })
          .then(function() {
            res.status(201).json(answer);
          });
          // END OF CHAIN
        } else if (mod === 'like') {
          answer.update({
            points: answer.get('points') + 1
          })
          .then(function(answer) {
            return user.update({
              points: user.get('points') + 1
            })
          })
          .then(function() {
            res.status(201).json(answer);
          })
        }
      });
    });
  },

  // TODO: auth/same-user check 
  deleteAnswer: function(req, res) {
    var aid = req.body.id_answer;

    db.Answer.findOne({
      where: {
        id: aid
      }
    })
    .then(function(answer) {
      var uid = answer.get('UserId');

      db.User.findOne({
        where: {
          id: uid
        }
      })
      .then(function(user) {
        var username = user.get('name');
        // DO AUTH/SAME-USER CHECK HERE
        return answer.destroy()  
        .then(function(id) {
          if (id) {
            res.sendStatus(204);
          }
        })
      })
    })
  }
};
