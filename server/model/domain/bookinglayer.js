var mongoose = require('mongoose');
var booking = mongoose.model('Booking');
var ObjectId = require('mongoose').Types.ObjectId;

/* Finds all bookings that are taken in the period that you search for.
*  These bookings have the roomnumbers with them, so the roomnumbers
*  are used to filter which are free.
* */
function getBooked(start, slut, callback) {
    booking.find({
        $or: [
            {$and: [{startDate: {$lte: start}}, {endDate: {$lte: slut}}, {endDate: {$gte: start}}]},
            {$and: [{startDate: {$gte: start}}, {startDate: {$lte: slut}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$lte: start}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$gte: start}}, {endDate: {$lte: slut}}]}
        ]
    }, '-_id room', function (err, results) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, results);
        }
    });
}

/* Inserts the new booking you created into the mongoDB, and returns the booking */
function insertBooking(start, slut, rId, callback) {
    var b = new booking({
        startDate: start,
        endDate: slut,
        room: rId,
        regDate: new Date()
    });

    b.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, b);
        }
    });
}

/* Returns the booking, populated with room info, with the given booking id */
function getBooking(ID, callback) {
    booking.findById({_id : ObjectId(ID)}).populate('roomId').exec(function (err, guestBooking) {
        if(err){
            callback(err)
        }
        else {
            callback(null, guestBooking);
        }
    })
}

module.exports.getBooked = getBooked;
module.exports.insertBooking = insertBooking;
module.exports.getBooking = getBooking;
