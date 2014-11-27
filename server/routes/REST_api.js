var express = require('express');
var router = express.Router();
var datalayer = require('../model/datalayer');
var async = require('async');

router.post('/freeRooms', function(req, res) {
    if (typeof global.mongo_error !== "undefined") return res.status(500).end('Error: ' + global.mongo_error);
    var roomIDs = [];
    var rooms = [];
    async.series([
        function (callback) {
            datalayer.getBooked(new Date(req.body.start), new Date(req.body.end), function (err, roomsTaken) {
                if (err) return callback(err);
                roomIDs = roomsTaken;
                callback();
            });
        },
        function (callback) {
            datalayer.getFreeRooms(roomIDs, req.body.roomsize, function (err, freeRooms) {
                if (err) return callback(err);
                rooms = freeRooms;
                callback();
            });
        }
    ], function (err) {
        if(err) return res.status(500).end('Error');
        res.json(rooms);
    });
});

module.exports = router;
