angular.module('boorish.answers', [])

.controller('answersController', function($scope, $location, Answers, Questions) {
  $scope.data = {};
  $scope.newAnswer = {};

  $scope.getQuestion = function() {
    Questions.getQuestion().then(function(data) {
      // question is always going to be the first item
      $scope.data.question = data.results[0];
      $scope.data.answers = data.results.slice(1);
    });
  };

  $scope.addAnswer = function() {
    Answers.addAnswer($scope.newAnswer).then(function() {
      $scope.getQuestion();
    })
  };

  $scope.updateAnswer = function(index, mod) {
    var answerID = $scope.data.answers[index].id;
    Answers.updateAnswer(answerID, mod).then(function() {
      $scope.getQuestion();
    })
  };

  $scope.updateQuestion = function(mod) {
    Questions.updateQuestion(mod).then(function() {
      $scope.getQuestion();
    })

  $scope.removeQuestion = function() {
    Questions.removeQuestion().then(function() {
      $location.path('/questions');
    })
  };

  $scope.removeAnswer = function(index) {
    var answerID = $scope.data.answers[index].id;
    $scope.data.answers.splice(index, 1);
    Answers.removeAnswer(answerID);
  };
  }

  $scope.getQuestion();
})