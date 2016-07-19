 angular.module('myApp', []).controller('myCtrl', function($scope) {
      var socket = io.connect(location.host);  //need to be dynamic if the the pi ip changes
      $scope.doClick = function(trigger){
          socket.emit(trigger);
        };
    });