var mongoose = require('mongoose');
var booking = mongoose.model('Booking');

function get(start, slut, callback) {
// a = parameter der kommer ind - startdato
// b = parameter der kommer ind - slutdato
// startDate = property i databasen
// endDate = property i databasen

    booking.find({
        $and: [
            { $or: [{startDate: {$gte: start}}, {endDate: {$lte: slut}}, {endDate: {$gte: start}}] },
            { $or: [{startDate: {$gte: start}}, {startDate: {$lte: slut}}, {endDate: {$gte: slut}} ] },
            { $or: [{startDate: {$lte: start}}, {endDate: {$gte: slut}}] },
            { $or: [{startDate: {$gte: start}}, {endDate: {$lte: slut}}] }
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