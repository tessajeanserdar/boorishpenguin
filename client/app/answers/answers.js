angular.module('boorish.answers', [])

.controller('answersController', function($scope, $location, Answers, Questions, Users) {
  $scope.data = {};
  $scope.newAnswer = {};

  $scope.getQuestion = function() {
    var path = $location.path(); // e.g., '/questions/19'
    Questions.getQuestion(path).then(function(req, res) {
      console.log(res);
      // question is always going to be the first item
      $scope.data.question = res.data.results[0];
      console.log('Question: ', $scope.data.question)
      $scope.data.answers = data.results.slice(1);
    });
  };

  $scope.addAnswer = function() {
    var id_question = $scope.data.question.id;
    Users.getUserWithId(function(user) {
      $scope.newAnswer.user = user.id;
      Answers.addAnswer($scope.newAnswer, id_question).then(function() {
        $scope.getQuestion();
      })
    });
  };

  $scope.updateAnswer = function(index, mod) {
    // mod is 'good' or 'like'
    var answerID = $scope.data.answers[index].id;
    Answers.updateAnswer(answerID, mod).then(function() {
      $scope.getQuestion();
    })
  };

  $scope.updateQuestion = function(mod) {
    var questionID = $scope.data.question.id;
    Questions.updateQuestion(questionID, mod).then(function() {
      $scope.getQuestion();
    })
  }

  $scope.removeQuestion = function() {
    var id_question = $scope.data.question.id;
    Questions.removeQuestion(id_question).then(function() {
      $location.path('/questions');
    })
  };

  $scope.removeAnswer = function(index) {
    var answerID = $scope.data.answers[index].id;
    $scope.data.answers.splice(index, 1);
    Answers.removeAnswer(answerID);
  }

  $scope.getQuestion();
})
