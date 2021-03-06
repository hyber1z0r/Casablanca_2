'use strict';

angular.module('casablanca.reservation', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: '/app/reservation/reservation.html',
            controller: 'ReservationCtrl'
        });
    }])

    .controller('ReservationCtrl', function ($scope, hotelBookingFactory, $location, $modal, $log, randomFac) {

        //$scope.setFieldsWithRandom = function () {
        //    randomFac.getRandom(function (err, g) {
        //        $scope.guest = g;
        //    })
        //};

        var local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        $scope.today = local;
        $scope.startDate = angular.copy(local);
        $scope.$watch('startDate', function () {
            $scope.tommorrow = addDays($scope.startDate, 1);
        })


        var checkoutdate = new Date();
        checkoutdate.setMinutes(checkoutdate.getMinutes() - checkoutdate.getTimezoneOffset());
        $scope.endDate = addDays(checkoutdate, 7);

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(date.getDate() + days)
            return result;
        }


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

        $scope.greatsuccess = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'MyModalIfSuccess.html',
                controller: 'ModalGreatSuccessCtrl',
                size: size,
                resolve: {
                    person: function () {
                        return $scope.guest;
                    },
                    single: function () {
                        return $scope.single;
                    },
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
                        $scope.greatsuccess();
                    }
                });
            } else {
                hotelBookingFactory.newBooking($scope.startDate, $scope.endDate, room_id, $scope.persons, function (err, data) {
                    if (err) {
                        console.log("Error in submitting persons");
                    }
                    else {
                        console.log("Great Success!");
                        $scope.greatsuccess();
                    }
                });
            }
        }


    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, persons) {
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
            $scope.persons.splice(index, 1);
        }

    })


    .controller('ModalGreatSuccessCtrl', function ($scope, $modalInstance, $location, person, single, persons) {
        $scope.person = person;
        $scope.single = single;
        $scope.persons = persons;

        $scope.ok = function () {
            $modalInstance.close();
            $location.path('/home')
        };

    });


