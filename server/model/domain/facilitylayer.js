var mongoose = require('mongoose');
var facility = mongoose.model('facility');
var facilitybooking = mongoose.model('facilitybooking');
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

module.exports.getFacilityBooked = getFacilityBooked;
module.exports.getFreeFacilityTimes = getFreeFacilityTimes;
