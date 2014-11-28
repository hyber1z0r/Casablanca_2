'use strict';

angular.module('casablanca.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/app/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', function ($scope) {

    });