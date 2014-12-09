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


   }]);
