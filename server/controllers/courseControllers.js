var db = require('../db/index.js');

module.exports = {
  allCourses: function(req, res) {
    db.Course.findAll()
    .then(function(courses) {
      var formattedCourses = courses.map(function(course) {
        return {
          id: course.id,
          name: course.name
        };
      });

      courses = {};
      courses.results = formattedCourses;
      res.json(courses);
    });
  },

  addUser: function(req, res) {
    var userCourse = req.body;
    console.log(userCourse);
    db.CourseUser.create(userCourse).then(function (task) {
      res.sendStatus(200);
    });
  }
};
