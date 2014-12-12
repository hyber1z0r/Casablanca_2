'use strict';

angular.module('casablanca.guesthome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/home', {
            templateUrl: 'app/guest/home/guesthome.html',
            controller: 'GuestHomeCtrl'
        });
    }])

    .controller('GuestHomeCtrl', ['$scope', 'guestBookingFactory', '$location', function ($scope, guestBookingFactory, $location, LoginService) {
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


   }]);
