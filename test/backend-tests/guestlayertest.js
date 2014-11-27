global.TEST_DATABASE = "mongodb://localhost/TestDataBase_zz1243";

var should = require("should");
var app = require("../../server/app");
var guestlayer = require('../../server/model/domain/guestlayer');
var testdata = require('./testdb');
var ObjectId = require('mongoose').Types.ObjectId;

describe('GuestLayer', function () {

    describe('insertGuests', function () {

        it('Should not return a error when a new guest is inserted', function (done) {
            var guestArray = [];
            var toby = {firstName: "Toby", lastName: "Maguire", address: "Spiderman address",
            phone: "88888888", email: "Toby@SpiderMail.com", dateOfBirth: "1982-07-23"};

            var dami = {firstName: "dami", lastName: "Maguire", address: "Spiderman address",
            phone: "88888888", email: "dami@SpiderMail.com", dateOfBirth: "1982-07-23"};

            var rami = {firstName: "rami", lastName: "Maguire", address: "Spiderman address",
            phone: "88888888", email: "rami@SpiderMail.com", dateOfBirth: "1982-07-23"};

            var sami = {firstName: "sami", lastName: "Maguire", address: "Spiderman address",
            phone: "88888888", email: "sami@SpiderMail.com", dateOfBirth: "1982-07-23"};

            var lami = {firstName: "lami", lastName: "Maguire", address: "Spiderman address",
            phone: "88888888", email: "lami@SpiderMail.com", dateOfBirth: "1982-07-23"};

            guestArray.push(toby, dami, rami, sami, lami);
            var bId = new ObjectId(202);
            guestlayer.insertGuests(guestArray, bId, function (err, documents) {
                should.not.exist(err);
                done();
            });
        });
        it('Should have all the right properties', function (done) {
            var guestArray = [];
            var toby = {firstName: "Toby", lastName: "Maguire", address: "Spiderman address",
                phone: "88888888", email: "Toby@SpiderMail.com", dateOfBirth: "1982-07-23"};
            var bId = new ObjectId();
            guestArray.push(toby);
            guestlayer.insertGuests(guestArray, bId, function (err, document) {
                document.should.have.property('firstName');
                document.should.have.property('lastName');
                document.should.have.property('addressName');
                document.should.have.property('phone');
                document.should.have.property('email');
                document.should.have.property('dateOfBirth');
                document.should.have.property('booking')
                done();
            });
        });

    });
});
