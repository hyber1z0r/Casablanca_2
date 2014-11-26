var express = require('express');
var router = express.Router();
var datalayer = require('../model/datalayer');
var async = require('async');

router.post('/freeRooms', function(req, res) {
    var rooms = [];
    if (typeof global.mongo_error !== "undefined") return res.status(500).end('Error: ' + global.mongo_error);
    async.series([
        function (callback) {
            datalayer.getBooked(req.body.start, req.body.end, function (err, roomsTaken) {
                if (err) return callback(err);
                rooms = roomsTaken;
                callback();
            })
        },
        function (callback) {

        }
    ], function (err) {
        if(err) return res.status(500).end('Error');
        res.json(rooms);
    })
});

module.exports = router;
