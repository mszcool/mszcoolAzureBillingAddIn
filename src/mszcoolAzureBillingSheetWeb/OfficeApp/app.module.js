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

            adalProvider.init({
                clientId: azureAdConfig.clientId,
                anonymousEndpoints: [],
                requireADLogin: false,
                endpoints: azureAdConfig.endpoints,
                cacheLocation: 'localStorage'
            }, $httpProvider);
        }
    ]);

    Office.initialize = function () {
        $(document).ready(function () {
            console.log('>>> app.module >>> Office.initialize()');
            angular.bootstrap(document.getElementById('container'), ['mszAddin']);
        });
    };

})();
