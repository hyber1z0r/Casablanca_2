'use strict';

angular.module('casablanca.reservation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: '/app/reservation/reservation.html',
            controller: 'ReservationCtrl'
        });
    }])

    .controller('ReservationCtrl', function ($scope) {
        $scope.search = function () {
            $scope.showRest = true
        }
    });