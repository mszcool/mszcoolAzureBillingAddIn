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

    mszAddin.constant('mszAuthAzureAdConfig', mszAuthAzureAdConfig);

    mszAddin.config(['$routeProvider', '$httpProvider', '$locationProvider', '$logProvider', 'adalAuthenticationServiceProvider', 'mszAuthAzureAdConfig',
        function ($routeProvider, $httpProvider, $locationProvider, $logProvider, adalProvider, azureAdConfig) {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }

            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.get["Cache-Control"] = "no-cache";
            $httpProvider.defaults.headers.get.Pragma = "no-cache";
            //$httpProvider.defaults.headers.get["If-Modified-Since"] = "0";

            adalProvider.init({
                tenant: azureAdConfig.tenant,
                clientId: azureAdConfig.clientId,
                anonymousEndpoints: [],
                requireADLogin: false,
                endpoints: azureAdConfig.endpoints,
                cacheLocation: 'localStorage'
            }, $httpProvider);
        }
    ]);

    //
    // A directive that is called when all ng-repeat tasks are completed
    //
    mszAddin.directive('mszRepeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.mszRepeatDone);
            }
        }
    });

    Office.initialize = function () {
        $(document).ready(function () {
            console.log('>>> app.module >>> Office.initialize()');
            angular.bootstrap(document.getElementById('container'), ['mszAddin']);
        });
    };

})();
