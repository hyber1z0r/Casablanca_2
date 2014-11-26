var bookinglayer = require('./domain/bookinglayer');
var roomlayer = require('./domain/roomlayer');

module.exports.getBooked = bookinglayer.getBooked;
module.exports.getFreeRooms = roomlayer.getFreeRooms;
