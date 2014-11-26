describe('myAppRename.rooms view2Ctrl', function () {

    describe('myController', function () {
        var $scope;

        beforeEach(module('myAppRename.rooms'));

        //Mocks for the test
        beforeEach(module({
            InfoFactory: {
                getInfo: function () {
                    return "Factory";
                }
            },
            InfoService: {
                getInfo: function () {
                    return "Service";
                }
            }
        }));

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('View2Ctrl', {$scope: $scope});
        }));

        it('Should have the value Factory', function () {
            expect($scope.infoFactory).toBe('Factory');
        });

        it('Should have the value Service', function () {
            expect($scope.infoService).toBe('Service');
        });
    });
});