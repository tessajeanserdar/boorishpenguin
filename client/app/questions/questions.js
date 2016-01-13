angular.module('boorish.questions', [])

.controller('questionsController', function($scope, $location, $http, Questions, Auth, Courses) {
  $scope.questions = [];
  $scope.courses = [];
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

    Courses.getAllCoursesForUser($scope.userId).then(function (data) {
      console.log(data);
      $scope.userInCourses = data.userIn;
      $scope.userNotInCourses = data.userNotIn;
    });
    
  };


  //On initial reroute after Google Authentication Set the User
  Auth.setUser()
  .then(function(){
    // if user is not authenticated, reroute to /signin
    if (!Auth.isAuth()) {
      console.log("Failed isAuth check")
      $location.path('/signin') 
    // else show questions
    } else {
      $scope.init();
    }
  })

});