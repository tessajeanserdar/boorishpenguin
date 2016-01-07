// answer controllers go in here
module.exports = {
  newAnswer: function(req, res) {
    console.log('new Answer received', req.body);
  },

  modAnswer: function() {
    console.log('request to modify answer received');
  },

  deleteAnswer: function() {
    console.log('request to delete answer received');
  }
}