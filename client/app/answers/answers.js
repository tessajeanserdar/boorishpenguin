angular.module('boorish.answers', [])

.controller('answersController', function($scope, Answers, Questions) {
  $scope.question = Questions.getQuestion(); //TODO: need to pass in question ID
  $scope.answers = $scope.question.answers;
  $scope.newAnswer = {};

  $scope.removeQuestion = function() {
    Questions.removeQuestion()
  }

  $scope.addAnswer = function() {
    console.log('you clicked')
    console.log($scope.newAnswer);
    Answers.addAnswer($scope.newAnswer);
  };
})