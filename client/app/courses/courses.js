angular.module('boorish.courses', [])
.controller('courseController', function($scope, $location,  $routeParams, $http, Questions, Auth, Courses) {
  
  // default to show questions, show resources by clicking on resources;
  $scope.listFilter = 'questions';

  Courses.getCourseInfo($routeParams.id).then(function (data ){
      $scope.courseInfo = data;
      $scope.courseInfo.resources = data.results.filter(function (post) {
        return !!post.isAResource;
      });
      $scope.courseInfo.questions = data.results.filter(function (post) {
        return !post.isAResource;
      })
      console.log('course data obj', $scope.courseInfo);
  });


})
