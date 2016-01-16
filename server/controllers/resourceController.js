var db = require('../db/index.js');
var UCtrl = require('./userControllers.js');
var Sequelize = require('sequelize');

module.exports = {
  allResources: function(req, res) {
    db.Post.findAll({
      where: {
        isAResource: true
      },
      include: [db.User, db.Course, db.Tag]
    })
    .then(function(resources) {
      var formattedRs = resources.map(function(resource) {
        return {
          id: resource.id,
          text: resource.text,
          title: resource.title,
          isAResource: true,
          points: resource.points,
          isGood: resource.isGood,
          // QuestionId: resource.QuestionId,
          responses: resource.responses,
          tagname: resource.Tag.name,
          coursename: resource.Course.name,
          user: resource.User.name,
          userid: resource.User.id,
          createdAt: resource.createdAt,
          imgUrl: resource.User.picture
        };
      });

      resources = {};
      resources.results = formattedRs;
      res.json(resources);
    });
  },
  newResource: function(req, res) {
    var d = new Date();
    var titl = req.body.title;
    var txt = req.body.text;
    var coursename = req.body.course;
    var tagname = req.body.tag;
    var uid = req.body.id_user;

    console.log('RESOURCE POST DATA:', req.body);

    db.User.findById(uid)
    .then(function(user) {
      user.update({
        points: user.points + 1
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
            db.Post.create({
              title: titl,
              text: txt,
              isAResource: true,
              UserId: user.id,
              CourseId: course.id,
              TagId: tag.id,
            })
            .then(function(resources) {
              res.status(201).json(resources);
            });
          });
        });
      })
    });
}

//   modAnswer: function(req, res) {
//     var aid = req.params.id;
//     var mod = req.body.mod;
//     var reqName = req.user.profile.emails[0].value;

//     db.Post.findById(aid)
//     .then(function(answer) {
//       var uid = answer.UserId;

//       db.User.findById(uid)
//       .then(function(user) {
//         if (mod === 'good') {
//           UCtrl.isUserTeacher(reqName, function(is) {
//             if (is) {
//               answer.update({
//                 isGood: !answer.isGood
//               })
//               .then(function(answer) {
//                 if (answer.isGood) {
//                   return user.update({
//                     points: user.points + 1
//                   })
//                 } else {
//                   return user.update({
//                     points: user.points - 1
//                   })
//                 }
//               })
//               .then(function() {
//                 res.status(201).json(answer);
//               });
//             } else {
//               res.sendStatus(404);
//             }
//           });
//         } else if (mod === 'like') {
//           db.User.find({
//             where: {
//               username: reqName
//             }
//           })
//           .then(function(requester) {
//             return answer.getVote({
//               where: ['UserId='+requester.id+' AND PostId='+answer.id]
//             })
//             .then(function(result) {
//               if (!result.length) {
//                 return answer.addVote(requester)
//                 .then(function() {
//                   return answer.update({
//                     points: answer.points + 1
//                   });
//                 })
//                 .then(function(answer) {
//                   return user.update({
//                     points: user.points + 1
//                   });
//                 });
//               } else {
//                 return answer.removeVote(requester)
//                 .then(function() {
//                   return answer.update({
//                     points: answer.points - 1
//                   });
//                 })
//                 .then(function(answer) {
//                   return user.update({
//                     points: user.points - 1
//                   });
//                 });
//               }
//             });
//           })
//           .then(function() {
//             res.status(201).json(answer);
//           });
//         } else {
//           res.sendStatus(404);
//         }
//       });
//     });
//   },

//   deleteAnswer: function(req, res) {
//     var aid = req.params.id;
//     var reqName = req.user.profile.emails[0].value;

//     db.Post.findById(aid)
//     .then(function(answer) {
//       var uid = answer.UserId;

//       db.User.findById(uid)
//       .then(function(user) {
//         var authorname = user.username;

//         UCtrl.isUserTeacher(reqName, function(is) {
//           if (is || reqName === authorname) {
//             var qid = answer.QuestionId;

//             db.Post.findById(qid)
//             .then(function(question) {
//               return question.update({
//                 responses: question.responses - 1
//               })
//             })
//             .then(function() {
//               return user.update({
//                 points: user.points - 1
//               });
//             })
//             .then(function() {
//               return answer.destroy()
//               .then(function() {
//                 res.sendStatus(204);
//               });
//             });
//           } else {
//             res.sendStatus(404);
//           }
//         });
//       });
//     });
//   }

};