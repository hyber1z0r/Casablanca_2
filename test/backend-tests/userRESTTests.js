/**
 * Created by jakobgaardandersen on 09/12/14.
 */
global.TEST_DATABASE = 'mongodb://localhost/TestDataBase_zz1231313';

var should = require('should');
var app = require('../../server/app');
var mongoose = require('mongoose');
var supertest = require('supertest');
var testdata = require('./testdb');
var bookinglayer = require('../../server/model/domain/bookinglayer');



describe('userREST API for /userapi', function () {


   beforeEach(function (done) {
      testdata.insertRooms(function () {
         testdata.insertGuests(function () {
            testdata.insertBookings(function () {
               done();
            });
         });
      });
   });

   it('Should return one booking', function (done) {
      var start = new Date();
      var slut = new Date();
      slut.setFullYear(2014, 11, 10);
      var room = 1;
      bookinglayer.insertBooking(start, slut, room, function (err, booking) {
         supertest(app)
             .get('/userApi/getBooking/' + booking._id)
             .end(function (err, res) {
                should.not.exist(err);
                var b = JSON.parse(res.text);
                b._id.toString().should.equal(booking._id.toString());
                b.should.have.property('startDate');
                b.should.have.property('endDate');
                b.should.have.property('room');
                b.should.have.property('regDate');
                done();
             });
      });


   });

});