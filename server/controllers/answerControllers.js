// answer controllers go in here
module.exports = {
  newAnswer: function() {
    console.log('new Answer received');
  },

  modAnswer: function() {
    console.log('request to modify answer received');
  },

  deleteAnswer: function() {
    console.log('request to delete answer received');
  }
}