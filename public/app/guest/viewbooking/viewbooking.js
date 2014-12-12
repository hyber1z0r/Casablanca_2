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



    }]);
