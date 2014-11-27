var bookinglayer = require('./domain/bookinglayer');
var roomlayer = require('./domain/roomlayer');
var guestlayer = require('./domain/guestlayer');

module.exports.getBooked = bookinglayer.getBooked;
module.exports.getFreeRooms = roomlayer.getFreeRooms;
module.exports.insertBooking = bookinglayer.insertBooking;
module.exports.insertGuests = guestlayer.insertGuests;