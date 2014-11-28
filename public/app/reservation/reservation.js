'use strict';

angular.module('casablanca.reservation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: '/app/reservation/reservation.html',
            controller: 'ReservationCtrl'
        });
    }])

    .controller('ReservationCtrl', function ($scope, hotelBookingFactory) {
        var room_id = '';
        $scope.search = function () {
            hotelBookingFactory.getFreeRooms($scope.startDate, $scope.endDate, $scope.roomsize, function (err, data) {
                if (err) {

                } else if (data.length == 0){
                    console.log(data);
                    console.log('No free rooms?');

                } else {
                    room_id = data[0]._id;
                    console.log(room_id);
                    $scope.showRest = true
                }
            });
        };

      $scope.persons = [];
      $scope.add = function () {
          $scope.persons.push($scope.guest);
          $scope.guest = {};
      };
      $scope.submit = function () {
          hotelBookingFactory.newBooking($scope.startDate, $scope.endDate, room_id, $scope.persons, function (err, data) {
              if(err){
                  console.log("Error in submitting persons");
              }
              else {
                  console.log("Great Success!");
              }
          })
      }

    });