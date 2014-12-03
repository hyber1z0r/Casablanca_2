'use strict';

angular.module('casablanca.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/app/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', function ($scope, LoginService) {
        $scope.$watchGroup(['username','password'], function () {
            LoginService.setUsername($scope.username);
            LoginService.setPassword($scope.password);
        })

    });