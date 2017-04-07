/// <reference path="../../bower_components/angular/angular.js" />
/// <reference path="../../Scripts/_officeintellisense.js" />
/// <reference path="../../Scripts/Office/1/office.js" />
/// <reference path="../../bower_components/adal-angular/lib/adal-angular.js" />

(function () {
    "use strict";

    angular.module('mszAddin').controller('loginController', ['$scope', '$q', '$location', 'adalAuthenticationService',
        function ($scope, $q, $location, adalAuthService) {

            $scope.init = function () {

                // First check if the current user is authenticated
                $scope.isSignedIn = adalAuthService.userInfo.isAuthenticated;

                // Reserved for future use, eventually showing who's currently signed-in if someone is signed-in!
                if ($scope.isSignedIn) {
                    $scope.meData =
                        {
                            userName: adalAuthService.userInfo.userName,
                            subscriptions: 0
                        };

                    //
                    // Initializing all Office UI Fabric components
                    //
                    var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
                    for (var i = 0; i < DropdownHTMLElements.length; ++i) {
                        var Dropdown = new fabric['Dropdown'](DropdownHTMLElements[i]);
                    }
                }
                else {
                    $scope.meData =
                        {
                            userName: "<<not signed in>>",
                            subscriptions: 0
                        };
                }
            };

            $scope.selectSubscription = function () {
            };

            $scope.logout = function () {
                showLoginDialog('/OfficeAppLogin/index.html#/logout').then(
                    function successCallback(response) {
                        $scope.loginError = false;
                        window.location.reload();
                    },
                    function errorCallback(response) {
                        $scope.loginError = true;
                        $scope.loginErrorMessage = response;
                        window.location.reload();
                    }
                );
            };

            $scope.login = function () {
                showLoginDialog('/OfficeAppLogin/index.html#/login').then(
                    function successCallback(response) {
                        $scope.loginError = false;
                        window.location.reload();
                    },
                    function errorCallback(response) {
                        $scope.loginError = true;
                        $scope.loginErrorMessage = response;
                        window.location.reload();
                    });
            };


            /*
             * Office Dialog API Handling
             */

            var _officeDialog;
            var _officeDialogDefer;

            var showLoginDialog = function (url) {
                _officeDialogDefer = $q.defer();

                var fullUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + url;

                Office.context.ui.displayDialogAsync(
                    fullUrl,
                    {
                        height: 40, width: 40
                    },
                    function (result) {
                        console.log('Authentication dialog initialized, hooking up events!');
                        _officeDialog = result.value;
                        _officeDialog.addEventHandler(Office.EventType.DialogMessageReceived, processLoginDialogMessage);
                    }
                );

                return _officeDialogDefer.promise;
            };

            var processLoginDialogMessage = function (args) {
                var resultMessage = args.message;
                console.log('Received message from Office Dialog...');
                if (resultMessage && resultMessage === "success") {
                    _officeDialog.close();
                    _officeDialogDefer.resolve();
                }
                else {
                    _officeDialog.close();
                    console.log("Authentication failed with error: " + args.message);
                    _officeDialogDefer.reject();
                }
            };

        }
    ]);
})();
