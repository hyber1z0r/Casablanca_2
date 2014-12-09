'use strict';

angular.module('casablanca.viewbooking', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/viewbooking', {
            templateUrl: 'app/guest/viewbooking/viewbooking.html',
            controller: 'GuestViewBookingCtrl'
        });
    }])

    .controller('GuestViewBookingCtrl', ['$scope','guestBookingFactory', '$location', function ($scope, guestBookingFactory, $location) {

        if (!$scope.isAuthenticated){
            $location.path('/home')
        }

        $scope.guests = [];
        $scope.bookinginfo = {};
        $scope.firstGuest = {};

        guestBookingFactory.getAllInfo($scope.profileID, function (err, user, booking, guests) {
            if(err) {
                console.log(err);
            } else {
                $scope.firstGuest = user;
                $scope.bookinginfo = booking;
                $scope.guests = guests;
            }
        });

        $scope.delete = function () {
            guestBookingFactory.deleteGuest($scope.profileID, function(err, status){
                if (err) {
                    console.log('There was an error in deleting the guest!');
                }
                else {
                    var username = LoginService.getUsername();
                    guestBookingFactory.deleteLogin(username, function (err, status) {
                        if (err) {
                            console.log('There was an error in deleting the login!');
                        }
                        else {
                            console.log(status);
                        }
                    })
                }
            })
        }
    }]);
