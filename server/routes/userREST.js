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

    module.exports = router;