angular.module('boorishpenguin', [
  'boorish.services',
  'boorish.users',
  'boorish.ask',
  'boorish.questions',
  'boorish.answers',
  'boorish.auth',
  'ngRoute'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
<<<<<<< HEAD
      templateUrl: 'app/questions/questions.html',
      controller: 'questionsController'
    })
=======
        templateUrl: 'app/ask/ask.html',
        controller: 'askController'
      })
>>>>>>> 00138eb7f99c0cc1c6f8a8060fc3e2b449a75c6f
    .when('/ask', {
      templateUrl: 'app/ask/ask.html',
      controller: 'askController'
    })
    .when('/questions', {
      templateUrl: 'app/questions/questions.html',
      controller: 'questionsController'
    })
    .when('/questions/:id', {
      templateUrl: 'app/answers/answers.html',
      controller: 'answersController'
    })
    .when('/users', {
      templateUrl: 'app/users/users.html',
      controller: 'UsersController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .otherwise({
      routeTo: '/signin'
    })
});