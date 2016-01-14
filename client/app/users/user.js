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
    // console.log("user id in promise",$scope.user.id)
    Courses.getAllCoursesForUser($scope.user.id).then(function (data) {
        // console.log("COURSE FETCHED:", data);
      $scope.courses = data.userInCourses;
    });
  });
  $scope.getAllUserActivity = function(allActivity) {
    // console.log('INVOKIING ACTIVITY', allActivity);
    return allActivity.reduce(function(userArray, questionObj) {
      // console.log("QOBJ.id:", questionObj.user, "SCOPEID:", $scope.user.name);
      if (questionObj.user === $scope.user.name) {
        userArray.push(questionObj);
      }
      // console.log('ONLY USER qs', userArray);
      return userArray;
    }, []);
  };

    Questions.getAllQuestions().then(function(res) {
      // console.log("QUESTIONS FETCHED", res.data);
      $scope.allActivity = res.data.results;
      $scope.questions = $scope.getAllUserActivity(res.data.results);
    }).then(function() {
      // console.log("NEW DATA");
    });

    // $(document).ready(function() {
    //   $('.nav a').on('click', function(){
    //     $(".nav").find(".active").removeClass("active");
    //     $(this).parent().addClass("active");
    //   });  
    // });
  // $scope.getAllUserAnswers = function() {
  //   //all questions -> $scope.AllActivity
  //   //make server request for read each question - /questions/id
  //   //for each array of answers returned- search to see if 
  //   //UserId matches profile user's id, if so, add to array in view

  //   //have a cache of questions checked? so that if length of getAllquestions is new, just check those? 

  // }


});
