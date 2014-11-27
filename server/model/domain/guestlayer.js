var mongoose = require('mongoose');
var guest = mongoose.model('Guest');


function insertGuests(guests, bId, callback) {
    for(g in guests){
        g.booking = bId;
    }
    guest.create(guests, function (err, gs) {
        if(err) {
            callback(err)
        } else {
            callback(null, gs);
        }
    });
}

module.exports.insertGuests = insertGuests;