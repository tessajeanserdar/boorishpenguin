angular.module('boorishpenguin', [
  'boorish.services',
  'boorish.ask',
  'boorish.questions',
  'boorish.answers',
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/ask', {
      templateUrl: 'app/ask/ask.html',
      controller: 'askController'
    })
});