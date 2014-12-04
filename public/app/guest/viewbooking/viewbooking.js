'use strict';

angular.module('casablanca.viewbooking', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/viewbooking', {
            templateUrl: 'app/guest/viewbooking/viewbooking.html',
            controller: 'GuestViewBookingCtrl'
        });
    }])

    .controller('GuestViewBookingCtrl', ['$scope', function ($scope, guestBookingFactory) {

        $scope.guests = [];
        $scope.bookinginfo = {};
        $scope.firstGuest = {};

        guestBookingFactory.findGuest($scope.profileID, function (err, data) {
            if(err){
                console.log("Error in finding the first guest");
            }
            else {
                $scope.firstGuest = data;
              guestBookingFactory.getBooking(data.booking, function (err, booking) {
                  if(err){
                      console.log("Error in finding the booking");
                  }
                  else {
                      $cope.bookinginfo = booking;
                      guestBookingFactory.getGuests(booking._id, '', function (err, allGuests) {
                          if(err) {
                              console.log("Error in finding the guests associated with the booking");
                          }
                          else {
                              $scope.guests = allGuests;
                          }
                      })
                  }
              })

            }
        })




    }]);
