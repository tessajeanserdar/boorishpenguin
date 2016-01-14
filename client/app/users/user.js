//client/app/users/userController.js
angular.module('boorish.user', [])
  .controller('UserController', function($scope, Users, Courses, Questions){


  Questions.getAllQuestions().then(function(questions) {
    console.log("QUESTIONS FETCHED", questions);
  });
//   $scope.getUserWithId = function(){
  Users.getUserById().then(function(user){
    // console.log("USER FETCHED:", user);
    $scope.user = user;
    console.log("user id in promise",$scope.user.id)
    Courses.getAllCoursesForUser($scope.user.id).then(function (data) {
        console.log("COURSE FETCHED:", data);
        $scope.courses = data.userInCourses;
    });
});
// }
//   $scope.getUserWithId();
  // $scope.
});
