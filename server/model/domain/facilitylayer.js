var mongoose = require('mongoose');
var facility = mongoose.model('Facility');
var facilitybooking = mongoose.model('FacilityBooking');
var ObjectId = require('mongoose').Types.ObjectId;


function getFacilityBooked(start, slut, callback) {
    facilitybooking.find({
        $or: [
            {$and: [{startDate: {$lte: start}}, {endDate: {$lte: slut}}, {endDate: {$gte: start}}]},
            {$and: [{startDate: {$gte: start}}, {startDate: {$lte: slut}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$lte: start}}, {endDate: {$gte: slut}}]},
            {$and: [{startDate: {$gte: start}}, {endDate: {$lte: slut}}]}
        ]
    }, '-_id fID', function (err, results) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, results);
        }
    });
}


function getFreeFacilityTimes(ids, facility, callback) {
    facility.find({$and: [{_id: {$not: {$in: ids}}}, {name: facility}]}, function (err, times) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, times);
        }
    });
}

function getFacility(name, callback){
    facility.find({name: name}, function (err, facility) {
        if(err) {
            callback(err);
        } else {
            callback(null, facility);
        }
    })
}

module.exports.getFacilityBooked = getFacilityBooked;
module.exports.getFreeFacilityTimes = getFreeFacilityTimes;
module.exports.getFacility = getFacility;
