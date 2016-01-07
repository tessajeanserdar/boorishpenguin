angular.module('boorish.ask', [])

.controller('askController', function($scope, Questions) {
  $scope.question = {};

  $scope.getUser = function() {
    // grabs the username from wherever we're storing it.
    // sets username to 
      // $scope.question.user
  }

  $scope.addQuestion = function() {
    // TODO: need to pull username into question object
    console.log('clicked addQuestion')
    Questions.addQuestion($scope.question);
  }

  $scope.cancel = function() {
    $scope.question.text = '';
    $scope.question.tags = '';
  }

})