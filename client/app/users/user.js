//client/app/users/userController.js
angular.module('boorish.user', [])
  .controller('UserController', function($scope, Users){

    //$scope.data = {}
  $scope.user = {
    'username': 'LizaTheCoolest',
    'name': 'Liza Lopez',
    'name_last': 'Lopez',
    'name_first': 'Liza',
    'isTeacher': '0',
    'points': '7259',
    'email': 'liza@liza.com',
    'picture': 'http://i.imgur.com/8K7s19Q.png'
    };

  //make a call to DB:
  //SELECT name from courses..inner join courses_students on student.id = coursesStudents.student.id
  $scope.classes = [
    'Advanced Woodshop',
    'Conversational Spanish',
    'Art History',
    'Remedial PE',
    'Speech and Debate'
  ];
  $scope.getUserWithId = function(){
    Users.getUserWithId().then(function(user){
      $scope.user = user;
    });
  };

  // $scope.
});
