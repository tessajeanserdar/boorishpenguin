angular.module('boorish.ask', [])

.controller('askController', function($scope, $window, $location, Questions) {
  $scope.question = {};

  $scope.addQuestion = function() {
    $scope.question.userId = $window.localStorage.getItem('com.boorish');
    // TODO: need to pull username into question object
    Questions.addQuestion($scope.question);
    $location.path('/questions');

  }

})