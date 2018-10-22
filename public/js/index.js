var socket = io();

var wifiButton = jQuery('#wifiroom');

wifiButton.on('click', function(e){
  e.preventDefault();
  console.log('clicked');
  socket.emit('createWifiHash')

});

socket.on('createWifiRoom', function(mac_address){
  console.log(`mac address: ${mac_address}`);
  var roomTextbox = jQuery('[name=room]');
  roomTextbox.val(mac_address)

})
