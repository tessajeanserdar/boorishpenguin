//client/app/users/userController.js
angular.module('boorish.user', [])
  .controller('UserController', function($scope, $location, Users, Courses, Questions){
  $scope.allActivity = [];
  $scope.questions = [];
  $scope.answers = [];
  $scope.resources = [];
  $scope.allCourses = [];
  $scope.courses = [];
  $scope.filterBy = 'questions';
  $scope.userId = localStorage.getItem('com.boorish');

  Users.getUserById().then(function(user){
    $scope.user = user;
    Courses.getAllCoursesForUser($scope.user.id).then(function (data) {
      $scope.courses = data.userInCourses;
    });
  });
  $scope.getAllUserActivity = function(allActivity) {
    return allActivity.reduce(function(userArray, questionObj) {
      if (questionObj.userId === +$scope.userId) {
        userArray.push(questionObj);
      }
      return userArray;
    }, []);
  };
  $scope.showCourse = function (courseId) {
    $location.path('/class/' + courseId); 
  };
  // Questions.getAllQuestions().then(function(res) {
  //   var allActivity = res.data.results;
  //   if (allActivity) {
  //     $scope.answers = allActivity.filter(function (post) {
  //       return post.isAnAnswer;
  //     });
  //     console.log('user\'s answers: ', $scope.answers);
  //     $scope.questions = allActivity.filter(function (post) {
  //       return !post.isAnAnswer && !post.isAResource;
  //     });
  //     console.log('user\'s questions: ', $scope.questions);
  //   }
  // });

  // Users.allUserActivity().then(function(res) {
  //   console.log('got this: ', res);
  //   $scope.answers = [];
  //   $scope.questions = [];
  //   $scope.resources = [];
  //   res.forEach(function (post) {
  //     if (post.isAResource) {
  //       $scope.resources.push(post);
  //     } else if (post.isAnAnswer) {
  //       $scope.resource.push(post);
  //     } else {
  //       $scope.questions.push(post);
  //     }
  //   });
  //   console.log('users questions: ', $scope.questions)
  //   console.log('users answers: ', $scope.answers)
  //   console.log('users resources: ', $scope.resources)
  // })
  
// http://127.0.0.1:8001/#/class/7
    $scope.getAllCourses = function () {
      Courses.getCourses().then(function (data) {
        $scope.allCourses = data.results;
        Courses.getUsersCourses($scope.userId).then(function(courseObj) {
          $scope.userCourseIds = courseObj.courseIds;
          if ($scope.allCourses) {
            $scope.courses = $scope.allCourses.filter(function (course) {
              return $scope.userCourseIds.indexOf(course.id) > -1
            });
          }
        });
      });
    };

    Questions.getAllQuestions().then(function(res) {
      $scope.allActivity = res.data.results;
      $scope.userActivity = $scope.getAllUserActivity(res.data.results);
      console.log('$scope.userActivity', $scope.userActivity);
      $scope.getAllCourses();
      var array = [];
      $scope.userActivity.forEach(function (post) {
        if (post.isAResource) {
          $scope.resources.push(post);
        } else if (post.isAnAnswer) {
          $scope.answers.push(post);
        } else {
          array.push(post);
        }
      });
      $scope.questions = array;
    });

    // Questions.getAllAnswers().then(function(res) {
    //   $scope.allAnswers = res.data.results;
    //   $scope.answers = $scope.allAnswers.reduce(function(userAnswers, answerObj) {
    //     if (answerObj.userid === +$scope.userId) {
    //       userAnswers.push(answerObj);
    //     }
    //     return userAnswers;
    //   }, []);
    // })
  // $scope.getAllUserAnswers = function() {
  //   //all questions -> $scope.AllActivity
  //   //make server request for read each question - /questions/id
  //   //for each array of answers returned- search to see if 
  //   //UserId matches profile user's id, if so, add to array in view

  //   //have a cache of questions checked? so that if length of getAllquestions is new, just check those? 

  // }


});
