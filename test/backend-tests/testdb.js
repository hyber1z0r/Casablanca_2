var mongoose = require("mongoose");
var booking = mongoose.model("Booking");
var room = mongoose.model("Room");
var guest = mongoose.model('Guest');
var bookingArray = require('../../server/model/sampledata/bookings.json').slice(0, 11);
var roomArray = require('../../server/model/sampledata/rooms.json').slice(0, 11);
var guestArray = require('../../server/model/sampledata/guests.json').slice(0, 11);

function insertBookings(done) {
    booking.remove({}, function () {
        booking.create(bookingArray, function (err) {
            done();
        });
    });
}

function insertRooms(done) {
    room.remove({}, function () {
        room.create(roomArray, function (err) {
            done();
        });
    });
}

function insertGuests(done) {
    guest.remove({}, function () {
        guest.create(guestArray, function (err) {
            done();
        })
    })
}

module.exports.insertBookings = insertBookings;
module.exports.insertRooms = insertRooms;
module.exports.insertGuests = insertGuests;