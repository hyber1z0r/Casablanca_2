'use strict';

// Declare app level module which depends on views, and components
angular.module('myAppRename', [
    'ngRoute',
    'myAppRename.controllers',
    'myAppRename.directives',
    'myAppRename.services',
    'myAppRename.factories',
    'myAppRename.filters',
    'myAppRename.home',
    'myAppRename.rooms',
    'myAppRename.facilities'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
