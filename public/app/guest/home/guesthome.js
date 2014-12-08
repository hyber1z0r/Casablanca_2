'use strict';

angular.module('casablanca.guesthome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/home', {
            templateUrl: 'app/guest/home/guesthome.html',
            controller: 'GuestHomeCtrl'
        });
    }])

    .controller('GuestHomeCtrl', ['$scope', 'guestBookingFactory', '$location', function ($scope, guestBookingFactory, $location) {
        if (!$scope.isAuthenticated){
            $location.path('/home')
        }

        $scope.delete = function () {
            guestBookingFactory.deleteGuest($scope.profileID, function(err, status){
                if (err) {
                    callback(err);
                }
                else {
                    console.log(status);
                }
            })
        }
    }]);
