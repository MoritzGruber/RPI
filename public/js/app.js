 angular.module('myApp', []).controller('myCtrl', function($scope) {
      var socket = io.connect(location.host);  //need to be dynamic if the the pi ip changes
     $scope.isHigh = false;
     $scope.isHigh = true;
     $scope.isInputMode = false;
      $scope.set = function(pinNumber, isHigh, isInputMode){
          if(pinNumber == null){pinNumber = 0}
          socket.emit('set', pinNumber, isHigh, isInputMode);
        };
        socket.on('change', function (val, pinNumber) {
            console.log('val = '+val +' pinNumber'+ pinNumber);
        })
    });