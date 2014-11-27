var mongoose = require('mongoose');
var guest = mongoose.model('Guest');
var ObjectId = require('mongoose').Types.ObjectId;


function insertGuests(guests, bId, callback) {
//    for(g in guests){
//        g.booking = bId;
//    }
    for(var i = 0; i < guests.length; i++){
        guests[i].booking = bId;
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