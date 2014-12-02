'use strict';

// Declare app level module which depends on views, and components
angular.module('casablanca', [
    'ngRoute',
    'ngAnimate',
    'casablanca.controllers',
    'casablanca.directives',
    'casablanca.services',
    'casablanca.factories',
    'casablanca.filters',
    'casablanca.home',
    'casablanca.rooms',
    'casablanca.facilities',
    'casablanca.reservation',
    'casablanca.login',
    'casablanca.guesthome'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });