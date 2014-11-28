'use strict';

angular.module('casablanca.reservation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: '/app/reservation/reservation.html',
            controller: 'ReservationCtrl'
        });
    }])

    .controller('ReservationCtrl', function ($scope, hotelBookingFactory) {
        $scope.search = function () {
            hotelBookingFactory.getFreeRooms($scope.startDate, $scope.endDate, $scope.roomsize, function (err, data) {
                if (err) {

                } else if (data.length == 0){
                    console.log(data);
                    console.log('No free rooms?');

                } else {
                    var room_id = data[0]._id;
                    console.log(room_id);
                    $scope.showRest = true
                }
            });
        }
    });