/* HUSK AT INKLUDERE DEPENDENCIES I KARAM.CONF.JS!!!*/
'use strict';

describe('casablanca.factories', function () {

    beforeEach(module('casablanca.factories'));


    describe('hotelBookingFactory', function () {
        var hotelBookingFactory;
        beforeEach(inject(function (_hotelBookingFactory_) {
            hotelBookingFactory = _hotelBookingFactory_;
        }));

        it('Should return the free rooms based on startdate, enddate and roomsize', function () {
            var start = new Date();
            start.setFullYear(2014, 10, 11); // 10 nov, 2014
            var end = new Date();
            end.setFullYear(2014, 10, 27); // 27 nov, 2014
            var roomsize = 5;
            hotelBookingFactory.getFreeRooms(start, end, roomsize, function (err, data) {
                expect(err).toBe(null);
                expect('Sort').toBe('Hvid');
            });

        });
    });
});