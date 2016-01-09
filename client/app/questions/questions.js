angular.module('boorish.questions', [])

.controller('questionsController', function($scope, Questions) {
  $scope.questions = [];

  Questions.getAllQuestions().then(function(data) {
    $scope.questions = data.results.map(function(question) {
      question.title = question.text.slice(0,60);
      return question;
    });
  })
})