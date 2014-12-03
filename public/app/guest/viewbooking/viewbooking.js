'use strict';

angular.module('casablanca.viewbooking', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/viewbooking', {
            templateUrl: 'app/guest/viewbooking/viewbooking.html',
            controller: 'GuestViewBookingCtrl'
        });
    }])

    .controller('GuestViewBookingCtrl', ['$scope', function ($scope) {
    }]);
