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

    var newBooking = function (start, end, roomId, guests, callback) {
        $http.post('/api/newReservation', {
            start: start,
            end: end,
            roomId: roomId,
            guests: guests
        })
            .success(function (data, status, headers, config) {
                callback(null, data)
            })
            .error(function (data, status, headers, config) {
                callback(data)
            })
    };

    var login = function (username, password, callback) {
        $http.post('/authenticate', {
            username: username,
            password: password
        })
            .success(function (data, status, headers, config) {
                // contains the user with, token
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    return {
        getFreeRooms: getFreeRooms,
        newBooking: newBooking,
        login: login
    }

});

app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        }
    };
});

