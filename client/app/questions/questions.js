angular.module('boorish.questions', [])

.controller('questionsController', function($scope, $location, Questions, Auth) {
  $scope.questions = [];
  Auth.setUser();

  $scope.init = function() {

    Questions.getAllQuestions().then(function(data) {
      $scope.questions = data.results.map(function(question) {
        question.title = question.text.slice(0,60);
        return question;
      });
    });
  };

  if (!Auth.isAuth()) {
    $location.path('/signin')
  } else {
    $scope.init();
  }
});
