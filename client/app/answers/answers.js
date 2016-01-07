angular.module('boorish.answers', [])

.controller('answersController', ['$scope', function($scope, Answers, Questions) {
  $scope.question = Questions.getQuestion(); //TODO: need to pass in question ID
  $scope.answers = $scope.question.answers;
}])