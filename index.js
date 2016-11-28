var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

server.listen(process.env.PORT || 3000, function(){
  console.log('Server started');
});

app.get('/', function(req, res){
  res.render('home');
})

io.on('connection', function(socket){
  console.log('Co nguoi ket noi '+socket.id);

  socket.on('CLIENT_GUI_TIN_NHAN', function(data){
    console.log('User gui tin nhan: ' + data);
    io.emit("SERVER_GUI_TIN_NHAN", data);
  });

  socket.on('disconnect', function(){
    console.log('Da thoat');
  });
});
