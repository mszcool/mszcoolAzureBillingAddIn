/// <reference path="../bower_components/angular/angular.js" />
/// <reference path="../Scripts/Office/1/office.js" />
/// <reference path="../bower_components/adal-angular/lib/adal-angular.js" />

/*
 * Route Configuration for the Authentication Dialog
 */

(function () {
    "use strict";

    var mszAddinAuth = angular.module('mszAddinAuth');

    mszAddinAuth.config(['$routeProvider', configureAuthRoutes]);

    function configureAuthRoutes($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: "/OfficeAppLogin/login/login.html",
                controller: "loginController",
                requireADLogin: true
            })
            .when('/logout', {
                templateUrl: "/OfficeAppLogin/logout/logout.html",
                controller: "logoutController",
                requireADLogin: false
            })
            .otherwise({ redirectTo: '/login' });
    }

})();