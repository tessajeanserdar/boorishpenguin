var db = require('../db/index.js');

module.exports = {
  newAnswer: function(req, res) {
    var txt = req.body.text;
    var uname = req.body.person;
    var qid = req.body.id_Question;
    
    db.User.findOne({
      where: {
        username: uname,
      }
    })
    .then(function(user) {
      return db.Answer.create({
        text: txt,
        UserId: user.get('id'),
        QuestionId: qid;
      })
    })
    .then(function() {
      return user.update({
        points: user.get('points') + 1
      })
    })
    .then(function() {
      res.sendStatus(201);
    });
  },

  modAnswer: function(req, res) {
    var aid = req.params.id;
    var mod = req.body.mod;

  },

  deleteAnswer: function(req, res) {
    console.log('request to delete answer received');
  }
}
