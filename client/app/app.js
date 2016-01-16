angular.module('boorishpenguin', [
  'boorish.services',
  'boorish.users',
  'boorish.user',
  'boorish.ask',
  'boorish.questions',
  'boorish.answers',
  'boorish.auth',
  'boorish.courses',
  'boorish.recommend',
  'boorish.resources',
  'boorish.chat',
  'ngMaterial',
  'ngRoute'
  ])

.config(function ($routeProvider, $sceProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/questions/questions.html',
      controller: 'questionsController'
    })
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
    .when('/users/user', {
      templateUrl: 'app/users/user.html',
      controller: 'UserController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/class/:id', {
      templateUrl: 'app/courses/course.html',
      controller: 'courseController'
    })
    .when('/recommend', {
      templateUrl: 'app/resources/recommend.html',
      controller: 'recommendController'
    })
    .when('/resources', {
      templateUrl: 'app/resources/resources.html',
      controller: 'resourcesController'
    })
    .when('/chat', {
      templateUrl: 'app/chat/chat.html',
      controller: 'chatController'
    })
    .otherwise({
      routeTo: '/signin'
    })

  $sceProvider.enabled(false);
});
