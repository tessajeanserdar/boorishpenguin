angular.module('boorish.ask', [])

.controller('askController', function($scope, $window, $location, Tags, Courses, Questions) {
  $scope.question = {};

  Tags.getTags()
  .then(function(data) {
    $scope.tagOptions = {
      availableOptions: data.results,
      selectedOption: data.results[data.results.length - 1]
    }
    console.log($scope.tagOptions);
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

  $scope.addQuestion = function() {
    $scope.question.userId = $window.localStorage.getItem('com.boorish');
    // TODO: need to pull username into question object
    $scope.question.course = $scope.courseOptions.selectedOption.name;
    $scope.question.tag = $scope.tagOptions.selectedOption.name;
    Questions.addQuestion($scope.question).then(function() {
      $location.path('/questions');
    });

  }

})