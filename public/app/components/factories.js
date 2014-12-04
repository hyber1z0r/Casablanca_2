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

app.factory('guestBookingFactory', function ($http) {

    var getBooking = function (guestBID, callback) {
        $http.post('/userApi/getBooking', {
            id: guestBID
        })
            .success(function (data, status, headers, config) {
                // contains the specified guest's booking info
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })

    };

    var findGuest = function (guestID, callback) {
        $http.get('/userApi/findguest/' + guestID)
            .success(function (data, status, headers, config) {
                // contains the specified guest's info
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var getGuests = function (guestBID, callback) {
        $http.get('/userApi/getguests/' + guestBID)
            .success(function (data, status, headers, config) {
                // contains all guests with the specified booking
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var getAllInfo = function (profileID, callback) {
        findGuest(profileID, function (err, userdoc) {
            if (err) {
                callback('Error in find guest: ' + err);
            } else {
                var user = data;
                getBooking(user.booking, function (err, bookingdoc) {
                    if (err) {
                        callback('Error in get booking: ' + err);
                    } else {
                        var booking = bookingdoc;
                        getGuests(booking._id, function (err, guestsdoc) {
                            if (err) {
                                callback('Error in get guests: ' + err)
                            } else {
                                var guests = guestsdoc.splice(1, guestsdoc.length);
                                callback(null, user, booking, guests);
                            }
                        })
                    }
                })
            }
        });
    };

    return {
        getAllInfo: getAllInfo
    }
});

