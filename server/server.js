const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User has joined'));

  socket.on('createMessage', (message, callback) =>{
    console.log('Recieved message');
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
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
  });
});

server.listen(port, () =>{
  console.log("Server is up on Port " + port);
});
