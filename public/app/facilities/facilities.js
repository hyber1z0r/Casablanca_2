'use strict';

angular.module('myAppRename.facilities', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/facilities', {
            templateUrl: 'app/facilities/facilities.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'api/user'
        }).
            success(function (data, status, headers, config) {
                $scope.users = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    });



