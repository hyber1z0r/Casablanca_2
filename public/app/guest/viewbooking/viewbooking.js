'use strict';

angular.module('casablanca.viewbooking', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/guest/viewbooking', {
            templateUrl: 'app/guest/viewbooking/viewbooking.html',
            controller: 'GuestViewBookingCtrl'
        });
    }])

    .controller('ModalDeleteCtrl', function ($scope, $modalInstance, deleteBooking) {

        $scope.ok = function () {
            deleteBooking();
            $modalInstance.close($scope.deleteBooking);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ModalDeleteCtrl2', function ($scope, $modalInstance, fbooking) {

        $scope.fbooking1 = fbooking;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })

    .controller('GuestViewBookingCtrl', ['$scope','guestBookingFactory', '$location', 'LoginService','$modal','$window', function ($scope, guestBookingFactory, $location, LoginService, $modal, $window) {

        if (!$scope.isAuthenticated){
            $location.path('/home')
        }

        $scope.guests = [];
        $scope.bookinginfo = {};
        $scope.firstGuest = {};

        guestBookingFactory.getAllInfo($scope.profileID, function (err, user, booking, guests, fbooking) {
            if(err) {
                console.log(err);
            } else {
                $scope.firstGuest = user;
                $scope.bookinginfo = booking;
                $scope.guests = guests;
                $scope.fbookinginfo = fbooking;
            }
        });

        $scope.deleteFacilityBooking = function (index) {
            guestBookingFactory.deleteFacilityBooking($scope.fbookinginfo[index]._id, function (err, status) {
                if (err) {
                    console.log('There was an error in deleting the facilitybooking');
                    status(500);
                }
                else {
                    console.log('Great success! Facilitybooking is deleted!');
                    status(200);
                }
            })
        }


        var deleteBooking = function () {
            guestBookingFactory.deleteGuest($scope.profileID, function(err, status){
                if (err) {
                    console.log('There was an error in deleting the guest!');
                }
                else {
                    var username = LoginService.getUsername();
                    guestBookingFactory.deleteLogin(username, function (err, status) {
                        if (err) {
                            console.log('There was an error in deleting the login!');
                        }
                        else {
                            console.log("should log out after this")
                            $scope.logout();
                            console.log(status);

                        }
                    })
                }
            })
        }

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'MyModalDeleteBooking.html',
                controller: 'ModalDeleteCtrl',
                size: size,
                resolve: {
                    deleteBooking: function () {
                        return deleteBooking;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
          }
        $scope.open2 = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalDeleteFacilityBooking.html',
                controller: 'ModalDeleteCtrl2',
                size: size,
                resolve: {
                    fbooking: function () {
                        return $scope.fbookinginfo;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
        }



    }]);
