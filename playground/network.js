var network = require('network')
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var password = '123abc';
// //number of rounds takes longer
// bcrypt.genSalt(10, (err, salt) =>{
//   bcrypt.hash(password, salt, (err,hash) => {
//     console.log(hash);
//   });
// });

// var hashedPassword= '$2a$10$Sl9ZU74GuxCIb4922wL87.pcv0R7BHrwzcAuZ2.d2oJCbYFmtG3dm'
//
// bcrypt.compare(password, hashedPassword, (err, res) => {
//   console.log(res);
// });
var mac_address;

var generateMessage = (text) =>{
  console.log(text);
}
network.get_interfaces_list(function(err, list) {

  /* list should be:

  [{
    name: 'eth0',
    ip_address: '10.0.1.3',
    mac_address: '56:e5:f9:e4:38:1d',
    type: 'Wired',
    netmask: '255.255.255.0',
    gateway_ip: '10.0.1.1'
   },
   { ... }, { ... }]

  */
  mac_address = list[0].mac_address
  bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(list[0].mac_address, salt, (err, hash) =>{
      console.log(list[0].mac_address);
      console.log(hash);
      generateMessage(mac_address)

    });
  })
})
