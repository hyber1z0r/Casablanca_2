'use strict';

angular.module('myAppRename.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: '/app/home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', function () {
    });