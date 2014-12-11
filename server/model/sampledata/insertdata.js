var mongoose = require("mongoose");
var db = require('../db');
var booking = mongoose.model("Booking");
var room = mongoose.model("Room");
var guest = mongoose.model('Guest');
var facility = mongoose.model('Facility');
var bookingArray = require('./bookings.json');
var roomArray = require('./rooms.json');
var guestArray = require('./guests.json');
var facilityArray = require('./facilitys.json');

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

function insertFacilities(done) {
    facility.remove({}, function () {
        facility.create(facilityArray, function (err) {
            done();
        })
    })
}

//insertFacilities(function () {
//    console.log('Inserted facilities');
//    process.exit(0);
//})
//insertBookings(function () {
//    console.log('Inserted bookings');
//    insertRooms(function () {
//        console.log('Inserted rooms');
//        insertGuests(function () {
//            console.log('Inserted guests');
//process.exit(0);
//        })
//    });
//});
