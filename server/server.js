const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('join', (params, callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required.');
    }

    callback();
  });

  socket.join(params.room);
  //socket.leave('string')

  //io.emit -> io.to(string).emit
  //socket.broadcast  -> socket.broadcast.to('The Office Fans').emit
  //socket.emit  ->

  socket.emit('newMessage', generateMessage('Admin', 'Welcome'));
  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.join} has joined`));
  socket.on('createMessage', (message, callback) =>{
    console.log('Recieved message');
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
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
