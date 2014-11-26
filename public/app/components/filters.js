'use strict';

/* Filters */

angular.module('casablanca.filters', []).
    filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    });
