angular.module('boorish.questions', [])

.controller('questionsController', function($scope, Questions) {
  $scope.data = {};

  Questions.getAllQuestions().then(function(data) {
    $scope.data.questions = data;
  })
})