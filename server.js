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

//gpio configuration
//using bcm gpio pins
// PINS USED: IN1:2 IN2:3 IN3:4 IN4:14  , these named are based on the names of the L298n motor controller
var pins = [];
for(i=0; i<41 ; i++){
    pins.push(null);
}
deactivPins = [0,1,2,4,6,9,14,17,20,25,27,28,30,34,39]


//define pins
pins[3] = gpio.export(2, {});
pins[5] = gpio.export(3, {});
pins[7] = gpio.export(4, {});
pins[8] = gpio.export(14, {});
pins[10] = gpio.export(15, {});
pins[11] = gpio.export(17, {});
pins[12] = gpio.export(18, {});
pins[13] = gpio.export(27, {});
pins[15] = gpio.export(22, {});
pins[16] = gpio.export(23, {});
pins[18] = gpio.export(24, {});
pins[19] = gpio.export(10, {});
pins[21] = gpio.export(9, {});
pins[22] = gpio.export(25, {});
pins[23] = gpio.export(11, {});
pins[24] = gpio.export(8, {});
pins[26] = gpio.export(7, {});
pins[29] = gpio.export(5, {});
pins[31] = gpio.export(6, {});
pins[32] = gpio.export(12, {});
pins[33] = gpio.export(13, {});
pins[35] = gpio.export(19, {});
pins[36] = gpio.export(16, {});
pins[37] = gpio.export(26, {});
pins[38] = gpio.export(20, {});
pins[40] = gpio.export(21, {});


exitHook(function () {
    console.log('exiting');
    pins[3] = gpio.unexport(2, {});
    pins[5] = gpio.unexport(3, {});
    pins[7] = gpio.unexport(4, {});
    pins[8] = gpio.unexport(14, {});
    pins[10] = gpio.unexport(15, {});
    pins[11] = gpio.unexport(17, {});
    pins[12] = gpio.unexport(18, {});
    pins[13] = gpio.unexport(27, {});
    pins[15] = gpio.unexport(22, {});
    pins[16] = gpio.unexport(23, {});
    pins[18] = gpio.unexport(24, {});
    pins[19] = gpio.unexport(10, {});
    pins[21] = gpio.unexport(9, {});
    pins[22] = gpio.unexport(25, {});
    pins[23] = gpio.unexport(11, {});
    pins[24] = gpio.unexport(8, {});
    pins[26] = gpio.unexport(7, {});
    pins[29] = gpio.unexport(5, {});
    pins[31] = gpio.unexport(6, {});
    pins[32] = gpio.unexport(12, {});
    pins[33] = gpio.unexport(13, {});
    pins[35] = gpio.unexport(19, {});
    pins[36] = gpio.unexport(16, {});
    pins[37] = gpio.unexport(26, {});
    pins[38] = gpio.unexport(20, {});
    pins[40] = gpio.unexport(21, {});
});

//get called if somebody connects via socket.io to our ip
//used for fast, live control via web clint
io.on('connection', function (socket) {
    socket.on('set', function (pinnumber, pinvalue) {
        console.log("pin: "+pinnumber+" was set to "+ pinvalue);
        if(pins[pinnumber]!= null){
            pins[pinnumber].set(pinvalue)
        }
    });
    console.log("a client joined");
    socket.on('disconnect', function () {
        console.log("a client left")
    });
});

