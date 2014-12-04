var mongoose = require('mongoose');
var guest = mongoose.model('Guest');
var request = require('request');

/* Adds the booking id as a property on the guest obj, and then adds them to the database */
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

/* Gets all guests associated with a specific booking */
function getGuests(bId, select, callback) {
    guest.find({booking: bId}, select).lean().exec(function (err, docs) {
        if (err) {
            callback(err);
        } else {
            callback(null, docs);
        }
    });
}

/* Gets guest with by unique ID */
function findGuest(gId, callback) {
    guest.findById(gId, function (err, docs) {
        if (err) {
            callback(err);
        } else {
            callback(null, docs);
        }
    });
}

/* Posts the username and password, with their obj ID, to the JPA Server -> Oracle DB */
function insertUsernames(gs, callback) {
    request.post({
        url: 'http://localhost:4000/user',
        body: gs,
        json: true
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, body);
        }
    });
}

module.exports.insertGuests = insertGuests;
module.exports.getGuests = getGuests;
module.exports.insertUsernames = insertUsernames;
module.exports.findGuest = findGuest;