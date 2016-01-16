angular.module('boorish.resources', [])

.controller('resourcesController', function($scope, $window, Users, Resources) {
  $scope.resources = [];

  // [
  //   {'name': 'Right Triangles And Trigonometry', 
  //   'url':'http://www.shmoop.com/right-triangles-trigonometry/',
  //   'votes': '2'},
  //   {'name': 'False Cognates', 
  //   'url':'http://www.shmoop.com/my/flashcards/overview/3B5ADA442DD84FA78A1CC1CA0F71A5CB/Basic-Spanish-False-Cognates',
  //   'votes': '4'},
  //   {'name': 'Acids and Bases', 
  //   'url':'http://www.shmoop.com/acids-bases/',
  //   'votes': '-1'},
  // ];

  Resources.getAllResources().then(function(data) {
    console.log('getAllResrouces', data);
    var resources = data.results;
    $scope.resources = resources.reduce(function(resourcesArr, resource) {
        resourcesArr.push({
            createdAt: resource.createdAt,
            id: resource.id,
            imgUrl: resource.imgUrl,
            isGood: resource.isGood,
            points: resource.points,
            text: resource.text,
            title: resource.title,
            user: resource.user,
            userid: resource.userid,
            tagname: resource.tagname,
            coursename: resource.coursename,
            responses: resource.responses
        });
        console.log('arrayCreated:', resourcesArr);
        return resourcesArr;
    }, []);

  })

})