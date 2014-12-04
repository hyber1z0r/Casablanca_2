global.TEST_DATABASE = "mongodb://localhost/TestDataBase_zz1243";

var should = require("should");
var app = require("../../server/app");
var guestlayer = require('../../server/model/domain/guestlayer');
var mongoose = require('mongoose');
var guest = mongoose.model('Guest');
var ObjectId = require('mongoose').Types.ObjectId;

describe('GuestLayer', function () {

    beforeEach(function (done) {
        guest.remove({}, function () {
            done();
        });
    });

    describe('insertGuests', function () {
        it('Should not return a error when a new guest is inserted', function (done) {
            var guestArray = [];
            var toby = {
                firstName: "Toby", lastName: "Maguire", address: "Spiderman address",
                phone: "88888888", email: "Toby@SpiderMail.com", dateOfBirth: "1982-07-23"
            };

            var dami = {
                firstName: "dami", lastName: "Maguire", address: "Spiderman address",
                phone: "88888888", email: "dami@SpiderMail.com", dateOfBirth: "1982-07-23"
            };

            var rami = {
                firstName: "rami", lastName: "Maguire", address: "Spiderman address",
                phone: "88888888", email: "rami@SpiderMail.com", dateOfBirth: "1982-07-23"
            };

            var sami = {
                firstName: "sami", lastName: "Maguire", address: "Spiderman address",
                phone: "88888888", email: "sami@SpiderMail.com", dateOfBirth: "1982-07-23"
            };

            var lami = {
                firstName: "lami", lastName: "Maguire", address: "Spiderman address",
                phone: "88888888", email: "lami@SpiderMail.com", dateOfBirth: "1982-07-23"
            };

            guestArray.push(toby, dami, rami, sami, lami);
            var bId = new ObjectId(202);
            guestlayer.insertGuests(guestArray, bId, function (err, rowsInserted) {
                should.not.exist(err);
                rowsInserted.should.equal(guestArray.length);
                done();
            });
        });
    });

    describe('getGuests', function () {
        // We need to recreated the sample data, to be actual guests that matches a booking. Which they don't at the moment.

    })
});
