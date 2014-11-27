var mongoose = require("mongoose");
var db = require('../db');
var booking = mongoose.model("Booking");
var room = mongoose.model("Room");
var guest = mongoose.model('Guest');
var bookingArray = require('./bookings.json');
var roomArray = require('./rooms.json');
var guestArray = require('./guests.json');

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
        });
    });
}

insertBookings(function () {
    console.log('Inserted bookings');
    insertRooms(function () {
        console.log('Inserted rooms');
        insertGuests(function () {
            console.log('Inserted guests');
        })
    });
});