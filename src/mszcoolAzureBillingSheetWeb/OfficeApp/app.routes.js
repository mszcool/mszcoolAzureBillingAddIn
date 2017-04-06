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
                templateUrl: "/OfficeApp/Login/login.html",
                controller: "loginController"
            })
            .when('/home', {
                templateUrl: "/OfficeApp/Home/home.html",
                controller: "homeController"
            })
            .when('/info', {
                templateUrl: "/OfficeApp/Info/info.html",
                controller: "infoController"
            })
            .otherwise({
                redirectTo: "/info"
            });
    }
    // --- End Route Configurations ---

})();