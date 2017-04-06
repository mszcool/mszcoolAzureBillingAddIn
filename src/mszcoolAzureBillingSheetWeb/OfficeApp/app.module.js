/// <reference path="../Scripts/FabricUI/MessageBanner.js" />
/// <reference path="../Scripts/Office/1/office.js" />

/*
 * Common App functionality and initialization
 */

var mszApp = (function () {
    "use strict";

    var mszAddin = angular.module('mszAddin', [
        'ngRoute',
        'ngSanitize',
        'AdalAngular'
    ]);

    mszAddin.config(['$routeProvider', '$httpProvider', '$locationProvider', '$logProvider',
        function ($routeProvider, $httpProvider, $locationProvider, $logProvider) {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }
    ]);

    Office.initialize = function () {
        $(document).ready(function () {
            console.log('>>> app.module >>> Office.initialize()');
            angular.bootstrap(document.getElementById('container'), ['mszAddin']);
        });
    };

})();
