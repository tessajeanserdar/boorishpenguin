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

  createCourse: function(req, res) {
    var course = req.body;
    db.Course.create(course).then(function (course) {
      res.sendStatus(200);
    });
  },

  addUser: function(req, res) {
    var userCourse = req.body;
    db.CourseUser.create(userCourse).then(function () {
      res.sendStatus(200);
    });
  },

  allUsersCourses: function(req, res) {
    var uid = req.params.id;
    db.CourseUser.findAll({
      where: {
        UserId: uid
      }
    }).then(function(courses) {
      // get array of course Ids:
      console.log('This console.log has to be here..', courses);
      var courseIds = [];
      if (courses.length > 0){
        courseIds = courses.map(function(object) {
          return object.dataValues.CourseId;
        });
      }
      var courseObj = {
        courseIds: courseIds
      }
      res.json(courseObj);
    })
  },

  allCoursesForUser: function(req, res) {
    console.log("in the all course for user server controller")
    var uid = req.params.id;
    db.CourseUser.findAll({
      where: {
        UserId: uid
      }
    }).then(function(courses) {
      var courseIds = courses.map(function (obj) {
        return obj.CourseId;
      })
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
  },
  courseQuestions: function(req,res){
    var cid = req.params.id;
    var response = {};
    response.results = {};

    db.Post.findAll({
      where: {
        CourseId : cid,
        isAnAnswer : 0
      },
      include : [db.User, db.Course, db.Tag]
    }).then(function(questions) {
      var formattedQs = questions.map(function(question) {
        return {
          courseId: question.CourseId,
          userId: question.UserId,
          id: question.id,
          title: question.title,
          text: question.text,
          isAnAnswer: false,
          points: question.points,
          responses: question.responses,
          isAnswered: question.isAnswered,
          isGood: question.isGood,
          isClosed: question.isClosed,
          createdAt: question.createdAt,
          coursename: question.Course.name,
          tagname: question.Tag.name,
          user: question.User.name,
          imgUrl: question.User.picture,
          updatedAt: question.updatedAt
        }
      });
      questions = {};
      questions.results = formattedQs;
      res.json(questions);
    })
  }
};
