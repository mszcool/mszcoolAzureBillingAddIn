/// <reference path="../bower_components/angular/angular.js" />
/// <reference path="../Scripts/Office/1/office.js" />
/// <reference path="../bower_components/adal-angular/lib/adal-angular.js" />

var mszAuthApp = (function () {
    "use strict";

    var mszAddinAuth = angular.module('mszAddinAuth', [
        'ngRoute',
        'ngSanitize',
        'AdalAngular'
    ]);

    mszAddinAuth.constant('mszAuthAzureAdConfig', mszAuthAzureAdConfig);

    mszAddinAuth.config(['$routeProvider', '$httpProvider', '$locationProvider', '$logProvider', 'adalAuthenticationServiceProvider', 'mszAuthAzureAdConfig',
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

            var postLogoutUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/OfficeAppLogin/index.html#/logout';

            adalProvider.init({
                tenant: azureAdConfig.tenant,
                clientId: azureAdConfig.clientId,
                anonymousEndpoints: [],
                requireADLogin: false,
                endpoints: azureAdConfig.endpoints,
                cacheLocation: 'localStorage',
                postLogoutRedirectUri: postLogoutUrl
            }, $httpProvider);
        }
    ]);

    Office.initialize = function (reason) {
        $(document).ready(function () {
            angular.bootstrap(document.getElementById('container'), ['mszAddinAuth']);
        });
    };

})();