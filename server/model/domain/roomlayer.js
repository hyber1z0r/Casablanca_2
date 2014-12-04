var mongoose = require('mongoose');
var room = mongoose.model('Room');

/* Returns all the that are not booked, and meets the desired roomsize */
function getFreeRooms(ids, size, callback) {
    room.find({$and: [{_id: {$not: {$in: ids}}}, {roomSize: size}]}, function (err, rooms) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, rooms);
        }
    });
}

module.exports.getFreeRooms = getFreeRooms;
