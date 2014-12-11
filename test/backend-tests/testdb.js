var mongoose = require("mongoose");
var booking = mongoose.model("Booking");
var room = mongoose.model("Room");
var guest = mongoose.model('Guest');
var facility = mongoose.model('Facility');
var facilitybooking = mongoose.model('FacilityBooking');
var bookingArray = require('../../server/model/sampledata/bookings.json').slice(0, 11);
var roomArray = require('../../server/model/sampledata/rooms.json').slice(0, 11);
var guestArray = require('../../server/model/sampledata/guests.json').slice(0, 11);
var facilityArray = require('../../server/model/sampledata/guests.json').slice(0, 11);
var facilityBookingArray = require('../../server/model/sampledata/guests.json').slice(0, 11);


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

function insertFacilitys(done) {
    facility.remove({}, function () {
        facility.create(facilityArray, function (err) {
            done();

        })
    })
}

function insertFacilityBookings(done) {
    facilitybooking.remove({}, function () {
        facilitybooking.create(facilityBookingArray, function (err) {
            done();
        })
    })
}

module.exports.insertBookings = insertBookings;
module.exports.insertRooms = insertRooms;
module.exports.insertGuests = insertGuests;
module.exports.insertFacilitys = insertFacilitys;
module.exports.insertFacilityBookings = insertFacilityBookings;
