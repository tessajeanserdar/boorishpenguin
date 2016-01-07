angular.module('boorishpenguin', [
  'boorish.question',
  'boorish.services',
  'boorish.answers'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/ask', {
      templateUrl: 'app/questions/ask.html',
      controller: 'askController'
    })
});