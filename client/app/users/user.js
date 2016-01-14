//client/app/users/userController.js
angular.module('boorish.user', [])
  .controller('UserController', function($scope, $location, Users, Courses, Questions){
  $scope.allActivity = [];
  var userActivity = [];
  $scope.questions = [];
  var userAnswers = [];
  $scope.userId = localStorage.getItem('com.boorish');

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
  $scope.getAllUserActivity = function(allActivity) {
    console.log('INVOKIING ACTIVITY', allActivity);
    return allActivity.reduce(function(userArray, questionObj) {
      console.log("QOBJ.id:", questionObj.user, "SCOPEID:", $scope.user.name);
      if (questionObj.user === $scope.user.name) {
        userArray.push(questionObj);
      }
      console.log('ONLY USER qs', userArray);
      return userArray;
    }, []);
  };

    Questions.getAllQuestions().then(function(data) {
      console.log("QUESTIONS FETCHED", data);
      $scope.allActivity = data.results;
      $scope.questions = $scope.getAllUserActivity(data.results);
    }).then(function() {
      console.log("NEW DATA");
    });

    $(document).ready(function() {
      $('.nav a').on('click', function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
      });  
    });
    // $scope.getAllUserActivity();
    $scope.isActive = function(route) {
      return route === $location.path;
    }
    
    // $scope.questions = $scope.allActivity.reduce(function(userArray, questionObj) {
    //   console.log('running reduce here')
    //   if (questionObj.id === $scope.userId) {
    //     userArray.push(questionObj);
    //   }
    //   console.log('ONLY USER qs', userArray);
    //   return userArray;
    // }, []);      
  // }

// }
//   $scope.getUserWithId();
  // $scope.
});
