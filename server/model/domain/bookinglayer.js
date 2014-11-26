var mongoose = require('mongoose');
var booking = mongoose.model('Booking');

function getBooked(start, slut, callback) {
// start = parameter der kommer ind - startdato
// slut = parameter der kommer ind - slutdato
// startDate = property i databasen
// endDate = property i databasen
    booking.find({
        $or: [
            {$and: [{startDate: {$lte: start}}, {endDate: {$lte: slut}}, {endDate: {$gte: start}}]},
            {$and: [{startDate: {$gte: start}}, {startDate: {$lte: slut}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$lte: start}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$gte: start}}, {endDate: {$lte: slut}}]}
        ]
    }, function (err, results) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, results);
        }
    })
}

module.exports.getBooked = getBooked;