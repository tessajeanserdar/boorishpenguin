angular.module('boorish.ask', [])

.controller('askController', function($scope, Questions) {
  $scope.question = {};
  $scope.answers = [];

  $scope.getUser = function() {
    // grabs the username from wherever we're storing it.
    // sets username to 
      // $scope.question.user
  }

})