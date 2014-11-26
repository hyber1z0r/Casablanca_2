var mongoose = require('mongoose');
var room = mongoose.model('Room');

function getFreeRooms(ids, callback) {
    room.find({
        $and: [
            {
                id: {
                    $not: {$in: ids}
                }
            },
            {roomSize: size}
        ]
    }, function (err, rooms) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, rooms);
        }
    });
}

module.exports.getFreeRooms = getFreeRooms;