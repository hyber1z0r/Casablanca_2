var express = require('express');
var router = express.Router();
var datalayer = require('../model/datalayer');


router.post('/getBooking', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getBooking(req.body.id, function callback(err, bookingInfo) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
         res.json(bookingInfo);
        }
    });
});

router.get('/findguest/:id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.findGuest(req.params.id, function callback(err, guestInfo) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(guestInfo);
        }
    });
});

router.get('/getguests/:id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getGuests(req.params.id, '', function callback(err, allGuests) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(allGuests);
        }
    });
});

router.delete('/deleteguests/:id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.deleteBooking(req.params.id, function callback(err, data) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.status(200).json({message: "Guest(s) was successfully deleted"});
        }
    })
})


    module.exports = router;