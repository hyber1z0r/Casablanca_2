var express = require('express');
var router = express.Router();
var datalayer = require('../model/datalayer');
var async = require('async');
var request = require('request');
var security = require('../security/security');

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
        result.push(array[i].roomId);
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
            datalayer.insertBooking(new Date(req.body.start), new Date(req.body.end), req.body.roomId, function (err, booking) {
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
            datalayer.getGuests(bookingId, function (err, gs) {
                if (err) {
                    console.log('Error in get guests');
                    callback(err);
                } else {
                    for (var i = 0; i < gs.length; i++) {
                        security.generate(gs[i]);
                        security.hash(gs[i]);
                    }
                    console.log('Guests should have: ID, USER, PASS \n');
                    console.log(gs);
                    request.post({
                        url: 'http://localhost:4000/URLURL',
                        guests: gs
                    }, function optionalCallback(err, httpResponse, body) {
                        if (err) {
                            //callback(err);
                            console.log('ERROR IN POST TO JPA');
                            callback();
                        } else {
                            console.log('Upload to JPA successful! Server responded with:', body);
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
