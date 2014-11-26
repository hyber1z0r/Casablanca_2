global.TEST_DATABASE = "mongodb://localhost/TestDataBase_zz1243";

var should = require("should");
var app = require("../../server/app");
var mongoose = require("mongoose");
var room = mongoose.model("Room");
var roomlayer = require('../../server/model/domain/roomlayer');
var testdata = require('./testdb');

describe('Roomlayer', function () {

    beforeEach(function (done) {
        testdata.insertRooms(function () {
            done();
        });
    });

    describe('getRooms', function () {
        it('Should return 5 rooms', function (done) {
            var roomIds = []; // There's no booked rooms so, it should display all rooms with size 1
            roomlayer.getFreeRooms(roomIds, 1, function (err, documents) {
                documents.length.should.equal(5);
                done();
            });
        });
        it('Should return 1 rooms', function (done) {
            var roomIds = [1,2,8,10]; // There's 4 booked rooms and 5 in total with size 1
            // so it should display 1 room
            roomlayer.getFreeRooms(roomIds, 1, function (err, documents) {
                documents.length.should.equal(1);
                done();
            });
        });
        it('Should return 0 rooms', function (done) {
            var roomIds = []; // There's 4 booked rooms and 5 in total with size 1
            // so it should display 1 room
            roomlayer.getFreeRooms(roomIds, '', function (err, documents) {
                should.not.exist(err);
                documents.length.should.equal(0);
                done();
            });
        });

    });

});