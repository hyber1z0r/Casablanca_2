'use strict';

angular.module('casablanca.guestbookfacility', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/bookfacility', {
            templateUrl: 'app/guest/bookfacility/guestbookfacility.html',
            controller: 'GuestBookFacilityCtrl'
        });
    }])

    .controller('GuestBookFacilityCtrl', ['$scope', '$location', 'guestBookingFactory', function ($scope, $location, guestBookingFactory) {
        if (!$scope.isAuthenticated) {
            $location.path('/home')
        }

        $scope.search = function () {
            $scope.showRest = true;

            var copy = angular.copy($scope.dateFacility)
            var startDate = new Date (copy.getFullYear(), copy.getMonth(), copy.getDate())
            console.log(startDate);
            guestBookingFactory.counterFacilityBooking(startDate, function (err, res) {
                if (err){
                    console.log('Cant read how many bookings there is');
                } else {
                    console.log('You can see how many there is');
                    console.log(res);


                }
            })
        };



        $scope.bookFacility = function () {
            var startDate = $scope.dateFacility;
            var hours = $scope.selected.time.split('-');
            startDate.setHours(hours[0]);
            var endDate = angular.copy(startDate);
            endDate.setHours(hours[1]);

            guestBookingFactory.bookFacility($scope.facility, startDate, endDate, $scope.profileID, function (err, res) {
                if (err) {
                    console.log('Sorry there was an error making your booking, nigguh!');
                } else {
                    console.log('Yay, great success, this is your booking:');
                    console.log(res);
                    $location.path('guest/home');
                }
            })
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

    }]);



