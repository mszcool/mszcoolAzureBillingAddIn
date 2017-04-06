/// <reference path="../../Scripts/FabricUI/MessageBanner.js" />

(function () {
    "use strict";

    angular.module('mszAddin').controller('loginController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.init = function () {
                // Reserved for future use, eventually showing who's currently signed-in if someone is signed-in!
                if ($scope.isSignedIn) {
                    $scope.meData =
                        {
                            userName: "test user",
                            subscriptions: 5
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
            }

            $scope.selectSubscription = function () {
            }

            $scope.logout = function () {
            }

            $scope.login = function () {
            }
        }
    ]);
})();
