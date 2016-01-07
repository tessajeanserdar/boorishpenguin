angular.module('boorishpenguin', [
  'boorish.question',
  'boorish.answers',
  'boorish.services'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/ask', {
      templateUrl: 'app/questions/ask.html',
      controller: 'askController'
    })
});