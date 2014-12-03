var mongoose = require('mongoose');
var booking = mongoose.model('Booking');
var ObjectId = require('mongoose').Types.ObjectId;


function getBooked(start, slut, callback) {
    booking.find({
        $or: [
            {$and: [{startDate: {$lte: start}}, {endDate: {$lte: slut}}, {endDate: {$gte: start}}]},
            {$and: [{startDate: {$gte: start}}, {startDate: {$lte: slut}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$lte: start}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$gte: start}}, {endDate: {$lte: slut}}]}
        ]
    }, '-_id roomId', function (err, results) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, results);
        }
    });
}

function insertBooking(start, slut, rId, callback) {
    var b = new booking({
        startDate: start,
        endDate: slut,
        roomId: rId,
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

function getBooking(ID, callback) {
    booking.findById({_id : ObjectId(ID)}, function (err, guestBooking) {
        if(err){
            callback(err)
        }
        else {
            callback(null, guestBooking);
        }
    })
};

module.exports.getBooked = getBooked;
module.exports.insertBooking = insertBooking;
module.exports.getBooking = getBooking;
