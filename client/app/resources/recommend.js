angular.module('boorish.recommend', [])

///////////////////////////////////////////////////////////////////////////////////////////////
///// Ask Controller: Pulls tags and courses from the database to display to the user. User
/////   writes question, and selects tag and course.
///// 
///// addQuestion: uses the addQuestion facotry to add question to the database
///////////////////////////////////////////////////////////////////////////////////////////////

.controller('recommendController', function($scope, $window, $location, Tags, Courses, Questions, Auth, Resources) {
  $scope.rec = {};

  if (!Auth.isAuth()) {
    $location.path('/signin')
  } else {

    Tags.getTags()
    .then(function(data) {
      $scope.tagOptions = {
        availableOptions: data.results,
        selectedOption: data.results[data.results.length - 1]
      }
      return;
    })
    .then(function() {
      return Courses.getCourses();
    })
    .then(function(data) {
      $scope.courseOptions = {
        availableOptions: data.results,
        selectedOption: data.results[data.results.length - 1]
      };
    });

    $scope.addResource = function() {
      $scope.rec.userId = $window.localStorage.getItem('com.boorish');  // pulls userId from localStorage
      $scope.rec.course = $scope.courseOptions.selectedOption.name; // pulls selected course
      $scope.rec.tag = $scope.tagOptions.selectedOption.name;  // pulls selected tag
      console.log("COURSE:", $scope.courseOptions.selectedOption.name, "REC OBJ", $scope.rec);
      Resources.addResource($scope.rec).then(function() { // adds new Question with addQuestion factory method
        $location.path('/resources'); // redirects to all questions
      });

    }
  }

})