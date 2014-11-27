global.TEST_DATABASE = "mongodb://localhost/TestDataBase_zz1243";

var should = require("should");
var app = require("../../server/app");
var bookinglayer = require('../../server/model/domain/bookinglayer');
var testdata = require('./testdb');

describe('Bookinglayer', function () {

    /* Inserts test bookings */
    beforeEach(function (done) {
        testdata.insertBookings(function () {
            done();
        });
    });

    describe('getBooked', function () {

        it('Should return an empty array when nothing found', function (done) {
            var start = new Date('October 13, 2009 11:13:00');
            var slut = new Date('October 18, 2009 14:20:00');
            bookinglayer.getBooked(start, slut, function (err, documents) {
                should.not.exist(err);
                documents.length.should.equal(0);
                done();
            });
        });

        // The 5 bookings overlap in this way: our start is before the booking start,
        // and our end is after booking start, and before booking end
        it('Should return 5 bookings', function (done) {
            var start = new Date();
            start.setFullYear(2014, 10, 11); // 10 nov, 2014
            var slut = new Date();
            slut.setFullYear(2014, 10, 27); // 27 nov, 2014
            bookinglayer.getBooked(start, slut, function (err, documents) {
                documents.length.should.equal(5);
                done();
            });
        });

        // The 1 booking overlap in this way: our start is before booking start,
        // and our end after booking end.
        it('Should return 1 booking', function (done) {
            var start = new Date();
            start.setFullYear(2014, 9, 30); // 30 oct, 2014
            var slut = new Date();
            slut.setFullYear(2014, 10, 12); // 12 nov, 2014
            bookinglayer.getBooked(start, slut, function (err, documents) {
                documents.length.should.equal(1);
                done();
            });
        });

        // The 1 booking overlap in this way: our start is after booking start and before booking end
        // our end is after booking start but before booking end.
        it('Should return 1 booking', function (done) {
            var start = new Date();
            start.setFullYear(2014, 10, 2); // 2 nov, 2014
            var slut = new Date();
            slut.setFullYear(2014, 10, 7); // 7 nov, 2014
            bookinglayer.getBooked(start, slut, function (err, documents) {
                documents.length.should.equal(1);
                done();
            });
        });

        // The 1 booking overlap in this way: our start is after booking start and before booking end
        // our end is after booking end
        it('Should return 1 bookings', function (done) {
            var start = new Date();
            start.setFullYear(2014, 10, 2); // 2 nov, 2014
            var slut = new Date();
            slut.setFullYear(2014, 10, 10); // 10 nov, 2014
            bookinglayer.getBooked(start, slut, function (err, documents) {
                documents.length.should.equal(1);
                done();
            });
        });
    });
    
    describe("insertBooking", function () {
       it('Should not return any error, when making a new booking', function (done) {
           var start = new Date();
           var slut = new Date();
           slut.setFullYear(2014,11,10);
           var roomID = 1;
           bookinglayer.insertBooking(start, slut, roomID, function (err, document) {
            should.not.exist(err);
               done();
           });
       });

       it('Should have all the right properties', function (done) {
            var start = new Date();
            var slut = new Date();
            slut.setFullYear(2014,11,10);
            var roomID = 1;
            bookinglayer.insertBooking(start, slut, roomID, function (err, document) {
                document.should.have.property('startDate');
                document.should.have.property('endDate');
                document.should.have.property('roomId');
                document.should.have.property('regDate');
                done();
            });
        });


        
        
    });

});