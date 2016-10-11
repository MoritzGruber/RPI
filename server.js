var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gpio = require("gpio");
var exitHook = require('exit-hook');

app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
// app.use('/', app.static(__dirname + '/public'));
// app.use('/', express.static(__dirname + '/public'));
// app.use("/public", express.static(path.join(__dirname, 'public')));
http.listen(3000, function () {
    console.log('listening on *:3000');
});
//config
var numberOfPins = 40;
//gpio configuration
//using bcm gpio pins
var pins = [];
for (var i = 0; i < numberOfPins; i++) {
    pins[i] = gpio.export(i+1, {});
}
exitHook(function () {
    console.log('exiting..');
    for (var i = 0; i < numberOfPins; i++) {
        pins[i] = gpio.unexport(i+1, {});
    }
    console.log('Left and reset all GPIO-Pins');
});
//get called if clint connects via socket.io to our ip
io.on('connection', function (socket) {
    socket.on('set', function (pinNumber, isHigh, isInputMode) {
        if(isInputMode){
            pins[pinNumber].setDirection("out");
            if (isHigh) {
                pins[pinNumber].set();
            } else {
                pins[pinNumber].set(0);
            }
        } else {
            pins[pinNumber].setDirection("in");
            pins[pinNumber].on("change", sendChangedPinWithValue);
        }
    });
    var sendChangedPinWithValue = function (val) {
        socket.emit('change', val);
    };
    console.log('a client joined');
    socket.on('disconnect', function () {
        console.log('a client left')
    });
});

