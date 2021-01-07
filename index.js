

var app = require('express')();
var port = process.env.PORT || 3000;
var Http = require('http').Server(app).listen(port);
var io = require('socket.io')(Http);
var player = 0





app.get('/',(req,res)=>{
res.sendFile(__dirname + "/htmls/Form.html")
})
app.get('/Room-1.html',(req,res)=>{res.sendFile(__dirname + "/htmls/Room-1.html")})

io.on("connection",(socket)=>{
  player = player + 1
  socket.on("join",(nam)=>{socket.broadcast.emit("player",nam);socket.emit("you",nam)})
  io.emit("online",player)
 socket.on("msg",(data)=>{socket.broadcast.emit("msg",data)})
socket.on('disconnect',()=>{player = player - 1;io.emit("online",player)})
})