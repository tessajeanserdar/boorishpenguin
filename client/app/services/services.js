angular.module('boorish.services', [])

.factory('Questions', function($http) {
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
    },

    getAllQuestions: function() {
      return $http({
        method: 'GET',
        url: '/townhall/questions'
      })
      .then(function() {
        return res.data;
      })
    }
  }
})

.factory('Answers', function($http) {

  return {
    getAnswers: function() {
      return $http({
        method: 'GET',
        url: 'townhall/answers',
      }).then(function() {
        return res.data
      })
    }, 

    addAnswer: function(answer) {
      $http({
        method: 'POST',
        url: 'townhall/answers',
        data: JSON.stringify({
          text: answer.text,
          points: 0,
          isGood: false,
          id_Question: // TODO: pull question ID
          isAnswered: false,
          name: question.user
        })
      })
      .then(function() {
        console.log('question sent');
      })
    }
  }
})