/// <reference path="../../bower_components/angular/angular.js" />
/// <reference path="../../Scripts/Office/1/office.js" />
/// <reference path="../../bower_components/adal-angular/lib/adal-angular.js" />

(function () {
    "use strict";

    angular.module('mszAddinAuth').controller('loginController', ['$rootScope', '$scope', '$location', 'adalAuthenticationService',
        function ($rootScope, $scope, $location, adalAuthService) {

            $scope.userName = "<< not signed-in >>";

            $scope.init = function () {
                if (adalAuthService.userInfo.isAuthenticated) {

                    $scope.userName = adalAuthService.userInfo.userName;
                    $scope.acquireTokenIfNotExists('MicrosoftGraph', adalAuthService, function () {
                        $scope.acquireTokenIfNotExists('AzureManagement', adalAuthService, function () {
                            $scope.completeAuth();
                        });
                    });
                }
            };

            $scope.completeAuth = function () {
                Office.context.ui.messageParent("success");
            };

            $scope.acquireTokenIfNotExists = function(endpointName, adalAuthService, nextStepCallback) {
                var resourceForEndpoint = adalAuthService.getResourceForEndpoint(endpointName);
                var tokenStored = adalAuthService.getCachedToken(resourceForEndpoint);
                if (tokenStored === null) {
                    adalAuthService.acquireToken(resourceForEndpoint, function (errorDescription, token, error) {
                        console.log('acquireToken for --' + resourceForEndpoint + '-- completed');
                        if (error === null) {
                            tokenStored = getCachedToken(resourceForEndpoint);
                            if (tokenStored === null) {
                                // TODO: add better error handling here
                                $location.path('/logout');
                            } else {
                                nextStepCallback();
                            }
                        } else if (error === 'login required') {
                            console.error('ADAL Error: ' + errorDescription);
                            $location.path('/login');
                        } else {
                            // TODO: add better error handling here
                            console.error('ADAL Error: ' + error + '\r\n' + errorDescription);
                            $location.path('/logout');
                        }
                    });
                }
                else {
                    nextStepCallback();
                }
            };

        }]);

})();