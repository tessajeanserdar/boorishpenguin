angular.module('boorish.question', [])

.factory('Questions', function($http) {
  return {
    // question is a string 
    addQuestion: function(question) {
      $http({
        method: 'POST',
        url: 'townhall/questions',
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
    },

    getAnswers: function(question) {
      $http({
        method: 'GET',
        url: 'api/questions',
      }).then(function() {
        return res.data
      })
    }
  }

})

.controller('questionController', function($scope) {
  $scope.question = {};
  $scope.answers = [];

  $scope.getUser = function() {
    // grabs the username from wherever we're storing it.
    // sets username to 
      // $scope.question.user
  }

  $scope.getAnswers = function() {
    $scope.answers = Questions.getAnswers();
  }

})