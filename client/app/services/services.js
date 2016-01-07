angular.module('boorish.services', [])

.factory('Questions', function($http, $location) {
  return {
    // add a question from /ask
    addQuestion: function(question) {
      $http({
        method: 'POST',
        url: 'townhall/ask',
        data: JSON.stringify({
          text: question.text,
          username: question.username, // TODO: this needs to be a username
          course: question.course,  // these are not setup yet
          tag: question.tag  // these are not setup yet
        })
      })
      .then(function() {
        console.log('question sent');
      })
    },

    getAllQuestions: function() {
      return $http({
        method: 'GET',
        url: '/townhall/questions/'
      })
      .then(function(res) {
        return res.data;
      })
    },

    getQuestion: function() { // TODO: Ask Steven about how to send this GET
      return $http({
        method: 'GET',
        url: '/townhall/questions/:id'
      })
      .then(function(res) {
        return res.data;
      })
    },

    updateQuestion: function(mod) {
      // code to update a question when there is a new like or has been marked as answered
      $http({
        method: 'POST',
        url: 'townhall/questions/:id',
        data: JSON.stringify({
          mod: mod
        })
        .then(function() {
          console.log('updated answer');
        })
      })
    },

    removeQuestion: function() {
      // code to remove a question by the user who posted it or isAdmin
      $http({
        method: 'DELETE',
        url: '/questions:id'
      })
      .then(function() {
        console.log('question deleted');
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
      })
      .then(function(res) {
        return res.data;
      })
    }, 

    addAnswer: function(answer) {

      $http({
        method: 'POST',
        url: 'townhall/answers',
        data: JSON.stringify({
          text: answer.text,
          answersQuestions: '', // what is this??
          id_Question: '', // TODO: pull question ID
          person: answer.user // TODO: pull question ID
        })
      })
      .then(function() {
        console.log('question sent');
      })
    },

    updateAnswer: function(answerID, mod) {
      $http({
        method: 'POST',
        url: 'townhall/answers/:id',
        data: JSON.stringify({
          id_answer: answerID,
          mod: mod
        })
        .then(function() {
          console.log('updated answer');
        })
      })
    },

    removeAnswer: function(answerID) {
      // code to delete answer from the data base by answerer or isAdmin
      // DELETE to /answers
      $http({
        method: 'DELETE',
        url: '/answers'
        data: JSON.stringify({
          id_answer: answerID
        })
      })
      .then(function() {
        console.log('answer deleted');
      })
    }
  }
})