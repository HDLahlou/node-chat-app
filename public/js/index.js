var socket = io();

var wifiButton = jQuery('#wifiroom');
var roomTextbox = jQuery('[name=room]');
var options = [];

wifiButton.on('click', function(e){
  e.preventDefault();
  console.log('clicked');
  socket.emit('createWifiHash')

});

socket.on('createWifiRoom', function(mac_address){
  console.log(`mac address: ${mac_address}`);
  roomTextbox.val(mac_address)

})

roomTextbox.on('click', function(){
  socket.emit('roomTextClick', function(arr){
      var rooms = jQuery('#rooms')
      var optionsTemp = [];
      var match;
      var temp;
      optionsTemp = arr.filter(function(room){
        match = false;
        for(j =0; j< options.length; j++){
          if(room == options[j]){
            match = true;
          }
        }
        if(!match){
          return room;
        }
      })
        options.push.apply(options, optionsTemp);
        console.log(optionsTemp);
        for(i = 0; i < optionsTemp.length; i++){
          temp = jQuery(`<option value='${optionsTemp[i]}'>`);
          rooms.append(temp);
        }

      console.log(options);
      console.log('help');
  });

  // li.text(`${formattedTime} ${message.from}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
})
