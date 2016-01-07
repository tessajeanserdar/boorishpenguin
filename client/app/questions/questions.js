angular.module('boorish.question', [])

.factory('askQuestions', function($http) {
  return {
    // add a question from /ask
    addQuestion: function(question) {
      $http({
        method: 'POST',
        url: 'townhall/ask',
        data: JSON.stringify({
          text: question.question,
          name: question.user,
          isAnswered: false,
          isGood: false,
          points: 0
        })
      })
      .then(function() {
        console.log('question sent');
      })
    }
  }

})


.controller('askController', function($scope, Questions) {
  $scope.question = {};
  $scope.answers = [];

  $scope.getUser = function() {
    // grabs the username from wherever we're storing it.
    // sets username to 
      // $scope.question.user
  }

})