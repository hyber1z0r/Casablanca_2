'use strict';

angular.module('casablanca.guesthome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/home', {
            templateUrl: 'app/guest/home/guesthome.html',
            controller: 'GuestHomeCtrl'
        });
    }])

    .controller('GuestHomeCtrl', ['$scope', function ($scope) {
    }]);
