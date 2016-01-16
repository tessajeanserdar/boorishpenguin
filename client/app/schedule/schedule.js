// create our angular module and inject firebase
angular.module('boorish.scheduleApp', ['firebase'])

// create our main controller and get access to firebase
.controller('scheduleController', function($scope, $firebaseObject, $route) {
  $scope.item = {};
  var userId = localStorage.getItem('com.boorish');

  var ref = new Firebase("https://crackling-heat-3845.firebaseio.com/schedules");
  // Pass the Firebase reference to $firebaseObject directly
     var obj = $firebaseObject(ref);
  obj.$bindTo($scope, 'schedules');

  var schedulesRef = ref.child("userSchedules");

   $scope.addTime = function(item){
    var status;
    if ($scope.item.busy === "undefined"){
      status = true;
    } else if ($scope.item.busy ){
      status = true;
    } else {
      status = false;
    }

    schedulesRef.child($scope.item.day).push({
      name: $scope.item.day,
      title: $scope.item.event,
      time: $scope.item.times,
      booked : status
    });
  }
    
})