angular.module('boorish.questions', [])

.controller('questionsController', function($scope, $location, $http, Questions, Auth, Courses) {
  $scope.questions = [];
  $scope.courses = [];
  Auth.setUser();

  $scope.userId = localStorage.getItem('com.boorish');

  $scope.addToCourse = function (index) {
    var course = $scope.courses[index];
    var id = course.id;
    var associationObject = {
      UserId: +$scope.userId,
      CourseId: id
    };
    $http.post('/townhall/CourseUsers', associationObject)
      .success(function () {
        console.log('successful post to CourseUsers');
      });
  };

  $scope.init = function() {

    Questions.getAllQuestions().then(function(data) {
      $scope.questions = data.results;
    });

    Courses.getCourses().then(function (data) {
      $scope.courses = data.results;
    });
    
  };

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin') 
  // else show questions
  } else {
    $scope.init();
  }
});