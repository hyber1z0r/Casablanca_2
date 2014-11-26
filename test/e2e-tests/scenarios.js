'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /home when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/home");
    });


    describe('home', function () {

        beforeEach(function () {
            browser.get('#/home');
        });


        it('should render home when user navigates to /home', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 1/);
        });

    });


    describe('rooms', function () {

        beforeEach(function () {
            browser.get('#/rooms');
        });


        it('should render rooms when user navigates to /rooms', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 2/);
        });

    });
});
