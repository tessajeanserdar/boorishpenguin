angular.module('boorish.questions', [])

.controller('questionsController', function($scope, Questions) {
  $scope.data = [{id: 1234, text: 'hello, this my question and it is super long and I really wanted to let you all know that this is the best question of all time. Will you help me?'}];

  Questions.getAllQuestions().then(function(data) {
    $scope.data.questions = data.map(function(question) {
      question.title = question.text.slice(0,60);
      return question;
    });
  })
})