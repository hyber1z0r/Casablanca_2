var mongoose = require('mongoose');
var room = mongoose.model('Room');

function getFreeRooms(ids, callback) {
    room.find({id: {$not: {$in: ids}}}, function (err, rooms) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, rooms);
        }
    });
}
