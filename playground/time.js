//Jan 1 1970 00:00:00 sm
const moment = require('moment')
// var date = new Date();
// date.getMonth()
// new Date().getTime()

// var date = moment();
// date.add(1,'year').subtract(9, 'months');
// date.format('MMM Do, YYYY')

var someTimestamp = moment().valueOf()
var createdAt = 1234;
var date = moment(createdAt);
date.format('h:mm: a')
