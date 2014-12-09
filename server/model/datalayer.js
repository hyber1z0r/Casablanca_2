var bookinglayer = require('./domain/bookinglayer');
var roomlayer = require('./domain/roomlayer');
var guestlayer = require('./domain/guestlayer');
var facilitylayer = require('./domain/facilitylayer');

module.exports.getBooked = bookinglayer.getBooked;
module.exports.getFreeRooms = roomlayer.getFreeRooms;
module.exports.insertBooking = bookinglayer.insertBooking;
module.exports.getBooking = bookinglayer.getBooking;
module.exports.insertGuests = guestlayer.insertGuests;
module.exports.getGuests = guestlayer.getGuests;
module.exports.insertUsernames = guestlayer.insertUsernames;
module.exports.findGuest = guestlayer.findGuest;
module.exports.deleteBooking = guestlayer.deleteBooking;
module.exports.deleteLogin = guestlayer.deleteLogin;
module.exports.getFacilityBooked = facilitylayer.getFacilityBooked;
module.exports.getFreeFacilityTimes = facilitylayer.getFreeFacilityTimes;