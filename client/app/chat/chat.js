angular.module('boorish.chat', ['firebase'])

.controller('chatController', function($scope,  $firebaseArray, $window, Users, Auth) {
  var ref = new Firebase('https://soymilk.firebaseIO.com/');
  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function(){
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      ref.push({name: name, text: text});
      $('#messageInput').val('');
  };
  ref.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
  function displayChatMessage(name, text) {
    // $('<div/>').text(text).prepend($('<em/>').text(name+':  ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };


});