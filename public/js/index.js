var socket = io();

socket.on('connect', function () {
  console.log('Connected to serverS');
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message){
  var formattedTime = moment(message.createdAt).format('h:mm a')
  console.log('New Message');
  var li = jQuery('<li></li>');
  li.text(`${formattedTime} ${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')
  })
});

socket.on('newLocationMessage', function (message){
var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = jQuery('<li></li>');
  var a = jQuery('<a target= "_blank">My current location</a>');

  li.text(`${formattedTime} ${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })
});
