var socket = io();

socket.on('connect', function () {
  console.log('Connected to serverS');

  socket.emit('createMessage',{
    from: 'jee',
    text: 'hey'
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message){
  console.log('New Message');
});
