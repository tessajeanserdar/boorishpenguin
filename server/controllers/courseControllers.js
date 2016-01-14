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
  },

  allCoursesForUser: function(req, res) {
    var uid = req.params.id;
    db.CourseUser.findAll({
      where: {
        UserId: uid
      }
    }).then(function(courses) {
      var courseIds = courses.map(function (obj) {
        return obj.CourseId;
      });
      var allCourses = {};
      allCourses.userCourseIds = courseIds;
      db.Course.findAll({
        where: {
          id: {
            $notIn: courseIds
          }
        }
      }).then(function (coursesNotIn) {
        allCourses.userNotIn = coursesNotIn;
        db.Course.findAll({
          where: {
            id: {
              $in: courseIds
            }
          }
        })
        .then(function (coursesIn) {
          allCourses.userIn = coursesIn;
          res.json(allCourses);
        });
      })

    });
  }
};
