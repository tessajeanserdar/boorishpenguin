angular.module('boorish.services', [])

.factory('Questions', function($http, $location) {
  return {
    // add a question from /ask
    addQuestion: function(question) {
      $http({
        method: 'POST',
        url: 'townhall/questions',
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
      console.log('requesting all questions')
      return $http({
        method: 'GET',
        url: '/townhall/questions/'
      })
      .then(function(res) {
        return res.data;
      })
    },

    getQuestion: function($location) { // TODO: Ask Steven about how to send this GET
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

    removeQuestion: function(questionID) {
      // code to remove a question by the user who posted it or isAdmin
      $http({
        method: 'DELETE',
        url: 'townhall/questions/',
        data: JSON.stringify({
          id_question: questionID
        })
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

    addAnswer: function(answer, questionID) {

      $http({
        method: 'POST',
        url: 'townhall/answers',
        data: JSON.stringify({
          text: answer.text,
          id_Question: questionID,
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
        url: 'townhall/answers',
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

.factory('Users', function($http){
    var allUsers = function(){
      return $http({
        method: 'GET',
        url: '/townhall/users'
      })
      .then(function(res){
        console.log('retrieved all users');
        return res.data;
      });
    };

    //TODO: get specific students/admins
    //var getStudents = function(){
    //
    //};
    //
    //var getAdmins = function(){
    //
    //};

    var addUser = function(user){
      return $http({
        method: 'POST',
        url: '/townhall/users',
        data: JSON.stringify({
          schoolId: user.schoolId,
          username: user.username,
          password: user.password,
          name: user.name,
          isTeacher: user.isTeacher,
          points: 0,
          email: user.email,
          picture: user.picture
        })
      })
      .then(function() {
        console.log('user added');
      });
    };

    //TODO: add multiple users
    //var addMany = function(users){
    //  return $http({
    //    method: 'POST',
    //    url: '/townhall/users',
    //    data: users
    //  });
    //};

    return {
      allUsers: allUsers,
      //getStudents: getStudents,
      //getAdmins: getAdmins,
      addOne: addUser
      //addMany: addMany
    }

  })

.factory('Auth', function ($http, $location, $window) {
  
  return { 
    setUser: function () {
    return $http({
      method: 'GET',
      url: '/user'
    })
    .then(function (res) {
      var username = res.data;
      console.log('res from setUser: ', res.data)
      if (username) {
        $window.localStorage.setItem('com.boorish', res.data.displayName);
      }
    });
  },

  isAuth: function () {
    console.log('in Local Storage? ', !!$window.localStorage.getItem('com.boorish'))
    return !!$window.localStorage.getItem('com.boorish');
  },

  signout: function () {
    $window.localStorage.removeItem('com.boorish');
    $location.path('/signin');
  }
}

});

