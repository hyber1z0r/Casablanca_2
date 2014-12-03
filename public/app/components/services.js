'use strict';

/* Services */

// Demonstrate how to register services
angular.module('casablanca.services', [])
    .service('InfoService', [function () {
        var info = "Hello World from a Service";
        this.getInfo = function () {
            return info;
        }
    }])
    .service('LoginService', [function () {
        var username;
        var password;

        var setUsername = function (user) {
            username = user;
        };
        var getUsername = function () {
            return username;
        };

        var setPassword = function (pass) {
            password = pass;
        };
        var getPassword = function () {
            return password;
        };

        return {
            getUsername: getUsername,
            getPassword: getPassword,
            setUsername: setUsername,
            setPassword: setPassword
        };
    }]);