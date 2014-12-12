angular.module('casablanca.controllers', []).
    controller('AppCtrl', function ($scope, $http, $window, $location, hotelBookingFactory, LoginService) {

        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        }

        $scope.title = "Casablanca";
        $scope.profileID = "";
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.message = '';
        $scope.error = null;

        $scope.guests = [];
        $scope.bookinginfo = {};
        $scope.firstGuest = {};
        $scope.fbookinginfo = [];

        $scope.login = function () {
            hotelBookingFactory.login(LoginService.getUsername(), LoginService.getPassword(), function (err, data) {
                if (err) {
                    console.log('Error in loggin in!');
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;
                    $scope.error = 'You failed to login. Invalid username or password';
                } else {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    $scope.profileID = profile._id;
                    $scope.isAdmin = profile.role == "admin";
                    $scope.isUser = profile.role == "user";
                    $scope.isSuperAdmin = profile.role == "superadmin";
                    $scope.error = null;
                    console.log($scope.profileID);
                    console.log($scope.isAuthenticated);

                    $location.path('guest/home');


                    console.log($location.path());
                }
            })
        };

        $scope.logout = function () {
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            $scope.isSuperAdmin = false;
            delete $window.sessionStorage.token;
            $location.path("#/home");
        }


    })
    .controller('MyCtrl2', function ($scope) {
        // write MyCtrl2 here
    });



