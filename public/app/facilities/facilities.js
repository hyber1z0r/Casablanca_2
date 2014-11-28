'use strict';

angular.module('casablanca.facilities', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/facilities', {
            templateUrl: 'app/facilities/facilities.html',
            controller: 'FacilityCtrl'
        });
    }])

    .controller('FacilityCtrl', function ($scope, $http) {

    });



