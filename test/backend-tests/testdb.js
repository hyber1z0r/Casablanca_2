var mongoose = require("mongoose");
var booking = mongoose.model("Booking");
var bookingArray = require('../../server/model/sampledata/bookings.json').slice(0, 11);

function insertBookings(done) {
    booking.remove({}, function () {
        booking.create(bookingArray, function (err) {
            done();
        });
    });
}

module.exports.insertBookings = insertBookings;