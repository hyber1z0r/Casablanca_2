var mongoose = require('mongoose');
var guest = mongoose.model('Guest');

function insertGuests(guests, bId, callback) {
    for (var i = 0; i < guests.length; i++) {
        guests[i].booking = bId;
    }
    guest.create(guests, function (err) {
        if (err) {
            callback(err)
        } else {
            callback(null, arguments.length - 1);
        }
    });
}

module.exports.insertGuests = insertGuests;