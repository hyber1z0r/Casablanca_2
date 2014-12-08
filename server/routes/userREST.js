var express = require('express');
var router = express.Router();
var datalayer = require('../model/datalayer');


router.get('/getBooking/:bookingId', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getBooking(req.params.bookingId, function callback(err, bookingInfo) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(bookingInfo);
        }
    });
});

router.get('/findguest/:gId', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.findGuest(req.params.gId, function callback(err, guestInfo) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(guestInfo);
        }
    });
});

router.get('/getguests/:bookingId', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getGuests(req.params.bookingId, '', function callback(err, allGuests) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(allGuests);
        }
    });
});

router.delete('/deleteguests/:bookingId', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.deleteBooking(req.params.bookingId, function callback(err, data) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.status(200).json({message: "Guest(s) was successfully deleted"});
        }
    })
});

router.delete('/deleteLogin/:username', function(req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.deleteLogin(req.params.username, function callback(err, data) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.status(200).json({message: "Login was successfully deleted"});
        }
    })
});


module.exports = router;