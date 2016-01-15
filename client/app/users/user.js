//client/app/users/userController.js
angular.module('boorish.user', [])
  .controller('UserController', function($scope, $location, Users, Courses, Questions){
  $scope.allActivity = [];
  var userActivity = [];
  $scope.questions = [];
  var userAnswers = [];
  $scope.allCourses = [];
  $scope.answers = [];
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


    $scope.getAllCourses = function () {
      Courses.getCourses().then(function (data) {
        $scope.allCourses = data.results;
        Courses.getUsersCourses($scope.userId).then(function(courseObj) {
          $scope.userCourseIds = courseObj.courseIds;
          if ($scope.allCourses) {
            $scope.courses = $scope.allCourses.map(function (course) {
              if ($scope.userCourseIds.indexOf(course.id) > -1) {
                return course;
              }
            });
          }
        });
      });
    };

    Questions.getAllQuestions().then(function(res) {
      $scope.allActivity = res.data.results;
      $scope.questions = $scope.getAllUserActivity(res.data.results);
      $scope.getAllCourses();
    });

    Questions.getAllAnswers().then(function(res) {
      $scope.allAnswers = res.data.results;
      $scope.answers = $scope.allAnswers.reduce(function(userAnswers, answerObj) {
        if (answerObj.userid === +$scope.userId) {
          userAnswers.push(answerObj);
        }
        return userAnswers;
      }, []);
    })
  // $scope.getAllUserAnswers = function() {
  //   //all questions -> $scope.AllActivity
  //   //make server request for read each question - /questions/id
  //   //for each array of answers returned- search to see if 
  //   //UserId matches profile user's id, if so, add to array in view

  //   //have a cache of questions checked? so that if length of getAllquestions is new, just check those? 

  // }


});
