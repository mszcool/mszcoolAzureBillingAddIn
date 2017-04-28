/// <reference path="../../bower_components/angular/angular.js" />
/// <reference path="../../Scripts/_officeintellisense.js" />
/// <reference path="../../Scripts/Office/1/office.js" />
/// <reference path="../../bower_components/adal-angular/lib/adal-angular.js" />

(function () {
    "use strict";

    angular.module('mszAddin').controller('loginController', ['$scope', '$q', '$timeout', '$location', 'adalAuthenticationService', 'subscriptionsService',
        function ($scope, $q, $timeout, $location, adalAuthService, subscriptionsService) {

            $scope.init = function () {

                // Initialize scope-level variables
                $scope.isSignedIn = adalAuthService.userInfo.isAuthenticated;
                $scope.meData = { userName: "<< not signed in >>", subscriptions: 0 };
                $scope.isLoadingSubscriptions = true;
                $scope.isLoadingSubscriptionLocations = true;
                $scope.selectedSubscription = null;
                $scope.loadedSubscriptions = []
                $scope.selectedSubscriptionLocation = null;
                $scope.loadedSubscriptionLocations = [];

                // Reserved for future use, eventually showing who's currently signed-in if someone is signed-in!
                if ($scope.isSignedIn) {
                    $scope.meData.userName = adalAuthService.userInfo.userName;

                    //
                    // Get the cached token
                    // 
                    var tokenStored = $scope.getCurrentToken();
                    if (tokenStored === null) {
                        return;
                    }

                    //
                    // Load the list of subscriptions
                    // 
                    subscriptionsService.getSubscriptions(tokenStored).then(
                        function (data) {
                            $scope.loadedSubscriptions = data;
                            $scope.meData.subscriptions = data.length;
                            $scope.isLoadingSubscriptions = false;
                        },
                        function (error) {
                            // TODO: Add better error handling
                            console.error('-- FAILED loading subscriptions ---');
                            console.error(error);
                        }
                    );
                }
            };

            $scope.hasSubscriptionSelected = function () {
                return (($scope.selectedSubscription !== null) && ($scope.selectedSubscriptionLocation !== null));
            }

            $scope.selectSubscription = function () {
                console.log("Selected Subscription: " + $scope.selectedSubscription);

                var tokenStored = $scope.getCurrentToken();
                if (tokenStored === null) {
                    return;
                }

                subscriptionsService.getSubscriptionLocations($scope.selectedSubscription, tokenStored).then(
                    function (data) {
                        $scope.loadedSubscriptionLocations = data;
                        $scope.isLoadingSubscriptionLocations = false;
                    },
                    function (error) {
                        // TODO: Add better error handling
                        console.error('-- FAILED loading subscriptions ---');
                        console.error(error);
                    });
            };

            $scope.getCurrentToken = function () {
                var resourceForEndpoint = adalAuthService.getResourceForEndpoint('https://management.azure.com/');
                var tokenStored = adalAuthService.getCachedToken(resourceForEndpoint);
                if (tokenStored === null) {
                    // No token available, start login-flow another time
                    $scope.isSignedIn = false;
                    $scope.login();
                    return null;
                }
                return tokenStored;
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

            $scope.prepOfficeFabric = function (dropdownName) {
                $timeout(function () {
                    var myDropdownHtml = document.getElementById(dropdownName);
                    if (myDropdownHtml !== null) {
                        // First delete items created earlier by the Office Fabric-JS components
                        var createdChildTitles = myDropdownHtml.querySelectorAll(".ms-Dropdown-title");
                        for (var i = 0; i < createdChildTitles.length; i++) {
                            myDropdownHtml.removeChild(createdChildTitles[i]);
                        }
                        var createdChildUls = myDropdownHtml.querySelectorAll(".ms-Dropdown-items");
                        for (var i = 0; i < createdChildUls.length; i++) {
                            myDropdownHtml.removeChild(createdChildUls[i]);
                        }
                        // Then finally initialize the Dropdown with the new elements
                        var myDropDown = new fabric['Dropdown'](myDropdownHtml);
                    }
                }, 0);
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