angular.module('boorish.resources', [])

.controller('resourcesController', function($scope, $window, Users) {
  $scope.list = [
    {'name': 'Right Triangles And Trigonometry', 
    'url':'http://www.shmoop.com/right-triangles-trigonometry/',
    'votes': '2'},
    {'name': 'False Cognates', 
    'url':'http://www.shmoop.com/my/flashcards/overview/3B5ADA442DD84FA78A1CC1CA0F71A5CB/Basic-Spanish-False-Cognates',
    'votes': '4'},
    {'name': 'Acids and Bases', 
    'url':'http://www.shmoop.com/acids-bases/',
    'votes': '-1'},
  ];

})