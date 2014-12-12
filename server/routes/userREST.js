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
             res.json({message: "Guest(s) was successfully deleted"});
        }
    })
});

router.delete('/deleteLogin/:username', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.deleteLogin(req.params.username, function callback(err, data) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(data);
        }
    })
});

/* FACILITY BOOKING */
router.post('/getFreeTimes', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getFacilityBooked(req.body.startDate, req.body.endDate, function callback(err, bookedFID) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            datalayer.getFreeFacilityTimes(bookedFID, req.body.facility, function (err, freeTimes) {
                if (err) {
                    return res.status(500).json({error: err.toString()});
                } else {
                    res.json(freeTimes);
                }
            });
        }
    });
});

router.get('/getFacility/:name', function(req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getFacility(req.params.name, function (err, facility) {
        if(err){
            res.status(500).json({error: err.toString()});
        } else {
            res.json(facility);
        }
    })
});

router.post('/bookFacility', function(req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.createFacilityBooking(req.body.startDate, req.body.endDate, req.body.fID, req.body.gID, function callback(err, data){
        if(err){
            res.status(500).json({error: err.toString()});
        } else {
            res.json(data);
        }
    })
});

router.get('/facilityBooking/:fBId', function(req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getFacilityBooking(req.params.fBId, function (err, data) {
        if(err){
            res.status(500).json({error: err.toString()});
        } else {
            res.json(data);
        }
    })
});

router.get('/getAllFacilityBookings/:gId', function(req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.getAllFacilityBookings(req.params.gId, function (err, data) {
        if(err){
            res.status(500).json({error: err.toString()});
        } else {
            res.json(data);
        }
    })
});


router.delete('/deleteFacilityBooking/:id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        return res.status(500).end('Error: ' + global.mongo_error);
    }
    datalayer.deleteFacilityBooking(req.params.id, function callback(err, data) {
        if (err) {
            return res.status(500).json({error: err.toString()});
        }
        else {
            res.json(data);
        }
    })
});


module.exports = router;