'use strict';

/* Factories */

var app = angular.module('casablanca.factories', []);

app.factory('hotelBookingFactory', function ($http) {

    var getFreeRooms = function (start, end, roomsize, callback) {
        $http.post('/api/freeRooms', {
            start: start,
            end: end,
            roomsize: roomsize
        })
            .success(function (data, status, headers, config) {
                callback(null, data)
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    return {
        getFreeRooms: getFreeRooms
    }

});