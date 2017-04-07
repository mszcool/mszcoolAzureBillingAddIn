/// <reference path="../../bower_components/angular/angular.js" />
/// <reference path="../../Scripts/Office/1/office.js" />
/// <reference path="../../bower_components/adal-angular/lib/adal-angular.js" />

(function () {

    "use strict";

    angular.module('mszAddinAuth').controller('logoutController', ['$rootScope', '$scope', '$location', 'adalAuthenticationService',
        function ($rootScope, $scope, $location, adalAuthService) {

            $scope.init = function () {
                if (adalAuthService.userInfo.isAuthenticated) {
                    adalAuthService.logOut();
                } else {
                    $scope.completeAuth();
                }
            }

            $scope.completeAuth = function () {
                Office.context.ui.messageParent("success");
            }

        }]);

})();