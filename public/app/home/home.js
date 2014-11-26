'use strict';

angular.module('casablanca.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', function () {
    });