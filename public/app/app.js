'use strict';

// Declare app level module which depends on views, and components
angular.module('casablanca', [
    'ngRoute',
    'casablanca.controllers',
    'casablanca.directives',
    'casablanca.services',
    'casablanca.factories',
    'casablanca.filters',
    'casablanca.home',
    'casablanca.rooms',
    'casablanca.facilities',
    'casablanca.reservation'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
