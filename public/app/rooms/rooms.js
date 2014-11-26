'use strict';

angular.module('myAppRename.rooms', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rooms', {
            templateUrl: 'app/rooms/rooms.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'InfoFactory', 'InfoService', function ($scope, InfoFactory, InfoService) {
        $scope.infoFactory = InfoFactory.getInfo();
        $scope.infoService = InfoService.getInfo();
    }]);
