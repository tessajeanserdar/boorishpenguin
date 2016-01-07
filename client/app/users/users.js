/**
 * Created by siobhan on 2016/01/06.
 */
angular.module('boorishpenguin.users', [])
  .controller('UsersController', function($scope, Users){
    $scope.users = [{'name': 'Jane'}, {'name': 'Paul'}];

    //$scope.data = {};

  })
  .factory('Users', function($http){
    var getAll = function(){
      return $http({
        method: 'GET',
        url: '/townhall/users'
      })
      .then(function(res){
        return res.data;
      });
    };

    //var getStudents = function(){
    //
    //};
    //
    //var getAdmins = function(){
    //
    //};

    var addOne = function(user){
      return $http({
        method: 'POST',
        url: '/townhall/users',
        data: user
      });
    };

    var addMany = function(users){
      return $http({
        method: 'POST',
        url: '/townhall/users',
        data: users
      });
    };

    return {
      getAll: getAll,
      //getStudents: getStudents,
      //getAdmins: getAdmins,
      addOne: addOne,
      addMany: addMany
    }

  });

/*
  app.get('/townhall/users', controllers.allUsers);
  app.post('/townhall/users', controllers.addUser);
 */