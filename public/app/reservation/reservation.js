'use strict';

angular.module('casablanca.reservation', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: '/app/reservation/reservation.html',
            controller: 'ReservationCtrl'
        });
    }])

    .controller('ReservationCtrl', function ($scope, hotelBookingFactory, $location, $modal, $log) {
        var room_id = '';
        $scope.search = function () {
            hotelBookingFactory.getFreeRooms($scope.startDate, $scope.endDate, $scope.roomsize, function (err, data) {
                if (err) {

                } else if (data.length == 0) {
                    console.log(data);
                    console.log('No free rooms?');
                    console.log('Give feedback that no available rooms');
                } else {
                    $scope.disableForm = false;
                    room_id = data[0]._id;
                    console.log(room_id);
                    $scope.showRest = true
                }
            });
        };

        $scope.persons = [];

        $scope.add = function () {
            $scope.persons.push(angular.copy($scope.guest));
            $scope.guest.firstName = '';
            $scope.guest.email = '';
            $scope.guest.dateOfBirth = '';
            $scope.guest.phone = '';
        };

        $scope.open = function (size) {
            console.log($scope.persons);
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    persons: function () {
                        return $scope.persons;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        $scope.submit = function () {
            if ($scope.single) {
                hotelBookingFactory.newBooking($scope.startDate, $scope.endDate, room_id, [$scope.guest], function (err, data) {
                    if (err) {
                        console.log("Error in submitting the single person");
                    }
                    else {
                        console.log("Great Success!");
                        $location.path('#/home');
                    }
                });
            } else {
                hotelBookingFactory.newBooking($scope.startDate, $scope.endDate, room_id, $scope.persons, function (err, data) {
                    if (err) {
                        console.log("Error in submitting persons");
                    }
                    else {
                        console.log("Great Success!");
                        $location.path('#/home');
                    }
                });
            }
        }


    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, persons) {
console.log(persons);
        $scope.persons = persons;
        $scope.selected = {
            item: $scope.persons[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


        $scope.delete = function (index) {
            $scope.persons.splice (index,1);
        }

    });