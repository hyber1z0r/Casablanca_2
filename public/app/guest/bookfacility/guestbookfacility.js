'use strict';

angular.module('casablanca.guestbookfacility', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/bookfacility', {
            templateUrl: 'app/guest/bookfacility/guestbookfacility.html',
            controller: 'GuestBookFacilityCtrl'
        });
    }])

    .controller('GuestBookFacilityCtrl', ['$scope', '$location', function ($scope, $location) {
       /* if (!$scope.isAuthenticated){
            $location.path('/home')
        } */

        $scope.times = ['10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22'];

    }]);



