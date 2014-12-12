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

    var newBooking = function (start, end, room, guests, callback) {
        $http.post('/api/newReservation', {
            start: start,
            end: end,
            room: room,
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
        $http.get('/userApi/getBooking/' + guestBID)
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
                var user = userdoc;
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
                                getAllFacilityBookings(user._id, function (err, fbookingdoc) {
                                    if (err) {
                                        callback('Error in getAllFacilityBookings: ' + err)
                                    } else {
                                        var fbooking = fbookingdoc;
                                        callback(null, user, booking, guests, fbooking);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    var deleteGuest = function (profileID, callback) {
        findGuest(profileID, function (err, userdoc) {
            if (err) {
                callback('Error in find guest (deleteguest) ' + err);
            }
            else {
                var user = userdoc;
                console.log(user);
                $http.delete('/userApi/deleteguests/' + user.booking)
                    .success(function (data, status, headers, config) {
                        // deletes all guests with the specified booking id
                        callback(null, status);
                    })
                    .error(function (data, status, headers, config) {
                        callback(data);
                    })
            }
        })
    };

    var deleteLogin = function (username, callback) {
        $http.delete('/userApi/deleteLogin/' + username)
            .success(function (data, status, headers, config) {
                callback(null, status);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var getFreeTimes = function (startDate, endDate, facility, callback) {
        $http.post('/userApi/getFreeTimes', {
            startDate: startDate,
            endDate: endDate,
            facility: facility
        })
            .success(function (data, status, headers, config) {
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var getFacility = function (name, callback) {
        $http.get('/userApi/getFacility/' + name)
            .success(function (data, status, headers, config) {
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var bookFacility = function (name, startDate, endDate, gID, callback) {
        getFacility(name, function (err, facility) {
            if (err) {
                callback(err);
            } else {
                console.log(facility);
                $http.post('/userApi/bookFacility', {
                    startDate: startDate,
                    endDate: endDate,
                    fID: facility._id,
                    gID: gID
                })
                    .success(function (data, status, headers, config) {
                        callback(null, data);
                    })
                    .error(function (data, status, headers, config) {
                        callback(data);
                    })
            }
        });
    };

    var getFacilityBooking = function (fBId, callback) {
        $http.get('/userApi/facilityBooking/' + fBId)
            .success(function (data, status, headers, config) {
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var getAllFacilityBookings = function (gId, callback) {
        $http.get('/userApi/getAllFacilityBookings/' + gId)
            .success(function (data, status, headers, config) {
                callback(null, data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            })
    };

    var deleteFacilityBooking = function (id, callback) {
       $http.delete('/userApi/deleteLogin/' + id)
           .success(function (data, status, headers, config) {
               callback(null, status);
           })
           .error(function (data, status, headers, config) {
               callback(data);
           })

    }

    return {
        deleteGuest: deleteGuest,
        getAllInfo: getAllInfo,
        deleteLogin: deleteLogin,
        getFreeTimes: getFreeTimes,
        bookFacility: bookFacility,
        getFacilityBooking: getFacilityBooking,
        getAllFacilityBookings: getAllFacilityBookings,
        deleteFacilityBooking: deleteFacilityBooking
    }
});

app.factory('randomFac', function ($http) {
    var getRandom = function (callback) {
        $http.get('/random')
            .success(function (data) {
                callback(null, data);
            })
            .error(function (err) {
                callback(err);
            })
    };

    return {
        getRandom: getRandom
    }
});

