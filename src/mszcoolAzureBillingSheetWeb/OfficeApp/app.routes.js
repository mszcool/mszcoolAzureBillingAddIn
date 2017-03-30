/*
 * Route configurations for AngularJs
 */

(function () {
    "use strict";

    var mszAddin = angular.module('mszAddin');

    // Loading the default routes
    mszAddin.config(['$routeProvider', configureRoutes]);

    // --- Begin Route Configurations ---
    function configureRoutes($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: "/OfficeApp/Home/home.html",
                controller: "homeController"
            })
            .when('/logout', {
                templateUrl: "/OfficeApp/Home/home.html",
                controller: "homeController"
            })
            .when('/home', {
                templateUrl: "/OfficeApp/Home/home.html",
                controller: "homeController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    // --- End Route Configurations ---

})();