'use strict';

angular.module('casablanca.rooms', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rooms', {
            templateUrl: 'app/rooms/rooms.html',
            controller: 'RoomCtrl'
        });
    }])

    .controller('RoomCtrl', ['$scope', function ($scope) {
    }]);
