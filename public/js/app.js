 angular.module('myApp', []).controller('myCtrl', function($scope) {
      var socket = io.connect('http://localhost:3000');
      $scope.doClick = function(trigger){
          socket.emit(trigger);
        };
    });