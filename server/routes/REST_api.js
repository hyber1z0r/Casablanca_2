var express = require('express');
var router = express.Router();
var datalayer = require('../model/datalayer');
var async = require('async');
var security = require('../security/security');
var mail = require('../email/email');

router.post('/freeRooms', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    var roomIDs = [];
    var rooms = [];
    async.series([
        function (callback) {
            datalayer.getBooked(new Date(req.body.start), new Date(req.body.end), function (err, roomsTaken) {
                if (err) {
                    callback(err);
                }
                else {
                    roomIDs = filterIds(roomsTaken);
                    callback();
                }
            });
        },
        function (callback) {
            datalayer.getFreeRooms(roomIDs, req.body.roomsize, function (err, freeRooms) {
                if (err) {
                    callback(err);
                }
                else {
                    rooms = freeRooms;
                    callback();
                }
            });
        }
    ], function (err) {
        if (err) {
            res.status(500).end('Error ' + err);
        } else {
            res.json(rooms);
        }
    });
});

function filterIds(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(array[i].room);
    }
    return result;
}


router.post('/newReservation', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }

    var _booking;
    var _rowsInserted;
    async.series([
        function (callback) {
            datalayer.insertBooking(new Date(req.body.start), new Date(req.body.end), req.body.room, function (err, booking) {
                if (err) {
                    callback(err);
                }
                else {
                    _booking = booking;
                    callback();
                }
            })
        },
        function (callback) {
            datalayer.insertGuests(req.body.guests, _booking._id, function (err, rowsInserted) {
                if (err) {
                    callback(err);
                }
                else {
                    _rowsInserted = rowsInserted;
                    callback();
                }
            })
        },
        function (callback) {
            var bookingId = req.body.guests[0].booking;
            datalayer.getGuests(bookingId, '_id', function (err, gs) {
                if (err) {
                    console.log('Error in get guests');
                    callback(err);
                } else {
                    for (var i = 0; i < gs.length; i++) {
                        security.generate(gs[i]); // we also set the role to user here!
                    }
                    mail.sentMail(_booking, req.body.guests, gs); // mail need to be sent right before the hashing of the passwords happen.
                    //for (var j = 0; j < gs.length; j++){
                    //    security.hash(gs[j]); //disabled right now for testing login! We cant guess the password from the hash
                    //} // Problems with hashing password and comparing with hashed password in db. ???
                    datalayer.insertUsernames(gs, function (err, response) {
                        if(err) {
                            callback(err)
                        } else {
                            callback();
                        }
                    });
                }
            });
        }
    ], function (err) {
        if (err) {
            res.status(500).end('Error ' + err);
        } else {
            res.json({booking: _booking, guests: _rowsInserted});
        }
    });
});

module.exports = router;
