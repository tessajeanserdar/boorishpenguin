/**
 * Created by siobhan on 2016/01/06.
 */
angular.module('boorishpenguin', [])
  .controller('UserController', function($scope, $http){
    $scope.users = [{'name': 'Jane'}, {'name': 'Paul'}];
  });