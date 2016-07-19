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
var IN1 = gpio.export(2, {});
var IN2 = gpio.export(3, {});
var IN3 = gpio.export(4, {});
var IN4 = gpio.export(14, {});

exitHook(function () {
    console.log('exiting');
    var IN1 = gpio.unexport(2, {});
    var IN2 = gpio.unexport(3, {});
    var IN3 = gpio.unexport(4, {});
    var IN4 = gpio.unexport(14, {});
});

//get called if somebody connects via socket.io to our ip
//used for fast, live control via web clint
io.on('connection', function (socket) {
    socket.on('foreward', function () {
        console.log("moving forward");
        IN1.set(1);
        IN2.set(0);
        IN3.set(1);
        IN4.set(0);
    });
    socket.on('left', function () {
        console.log("turning left");
        IN1.set(1);
        IN2.set(0);
        IN3.set(0);
        IN4.set(0);
    });
    socket.on('stop', function () {
        console.log("stopping... ");
        IN1.set(0);
        IN2.set(0);
        IN3.set(0);
        IN4.set(0);
    });
    socket.on('right', function () {
        console.log("turning right");
        IN1.set(0);
        IN2.set(0);
        IN3.set(1);
        IN4.set(0);
    });

    socket.on('backward', function () {
        console.log("moving backward");
        IN1.set(0);
        IN2.set(1);
        IN3.set(0);
        IN4.set(1);
    });
    console.log("a client joined");
    socket.on('disconnect', function () {
        console.log("a client left")
    });
});

