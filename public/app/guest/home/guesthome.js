'use strict';

angular.module('casablanca.guesthome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/home', {
            templateUrl: 'app/guest/home/guesthome.html',
            controller: 'GuestHomeCtrl'
        });
    }])

    .controller('GuestHomeCtrl', ['$scope', 'guestBookingFactory', '$location', 'LoginService', function ($scope, guestBookingFactory, $location, LoginService) {
        if (!$scope.isAuthenticated){
            $location.path('/home')
        }

        $scope.delete = function () {
            guestBookingFactory.deleteGuest($scope.profileID, function(err, status){
                if (err) {
                    console.log('There was an error in deleting the guest!');
                }
                else {
                    console.log(status);
                }
            })
        }

        $scope.deleteLogin = function () {
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
    }]);
