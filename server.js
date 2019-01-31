var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express  = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.room=""
  socket.join(socket.room)
  socket.username = "anonymous";
    socket.on('disconnect', function(){
        console.log('user disconnected');
        });
    socket.on('room',function(data){
        if(socket.room)
        socket.leave(socket.room);
        console.log("room left + and joined : " + data.roomname );

        socket.room = data.roomname;
        socket.join(data.roomname);
    });
    socket.on('chat message', function(msg){
        io.sockets.in(socket.room).emit('chat message', {'message':msg.message,'username':socket.username});
        console.log('message: ' + msg);
      });
    socket.on('changeUsername',function(data){
        socket.username = data.username;
    });
  });




http.listen(3000, function(){
  console.log('listening on *:3000');
});