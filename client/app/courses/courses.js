angular.module('boorish.courses', [])
.controller('courseController', function($scope, $location,  $routeParams, $http, Questions, Auth, Courses) {
  
  Courses.getCourseInfo($routeParams.id).then(function (data ){
      console.log('course data obj', data)
      $scope.courseInfo = data;
  });
})
