angular.module('boorishpenguin', [
  'boorish.question'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/ask', {
      templateUrl: 'app/questions/ask.html',
      controller: 'askController'
    })
});