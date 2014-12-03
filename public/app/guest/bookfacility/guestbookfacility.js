'use strict';

angular.module('casablanca.guestbookfacility', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/bookfacility', {
            templateUrl: 'app/guest/bookfacility/guestbookfacility.html',
            controller: 'GuestBookFacilityCtrl'
        });
    }])

    .controller('GuestBookFacilityCtrl', ['$scope', function ($scope) {
    }]);
