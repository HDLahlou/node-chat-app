const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const network = require('network')
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {Users} = require('./utils/users')
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

// room list
  socket.on('join', (params, callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }

    var userlist = users.getUserList(params.room)
    if(userlist.filter((user) => user === params.name).length > 0){
      return callback('Name is currently taken')
    }

    params.room = params.room.toUpperCase();
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createWifiHash', () =>{
     network.get_interfaces_list(function(err, list) {
      var mac_address = list[0].mac_address
      console.log(mac_address);
      bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(mac_address, salt, (err, hash) =>{
                socket.emit('createWifiRoom', hash)
        });
      })

})})



  //socket.leave('string')

  //io.emit -> io.to(string).emit
  //socket.broadcast  -> socket.broadcast.to('The Office Fans').emit
  //socket.emit  ->


  socket.on('createMessage', (message, callback) =>{
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user){
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  });
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })

    //sends to everyone except the person sending it
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  socket.on('disconnect', () =>{
    console.log('User has disconnected');
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`))
    }
  });
});

server.listen(port, () =>{
  console.log("Server is up on Port " + port);
});
