angular.module('boorish.courses', [])
.controller('courseController', function($scope, $location,  $routeParams, $http, Questions, Auth, Courses) {
  
  Courses.getCourseInfo($routeParams.id).then(function (data ){
      console.log(data)
      $scope.courseInfo = data;
  });
})
