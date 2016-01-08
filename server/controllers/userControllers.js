var db = require('../db/index.js');

module.exports = {
  allUsers: function(req, res) {
    var course = req.body.coursename;

    db.User.findAll()
    .then(function(users)) {
      var formattedUsers = users.map(function(user) {
        return {
          id: user.id,
          schoolId: user.schoolId,
          name: user.name,
          email: user.email,
          points: user.points,
          image: user.image
        }
      });

      users = {};
      users.results = formattedUsers;
      res.json(users);
    }
  },

  newUser: function(req, res) {
    console.log('new user received');
  }
}
