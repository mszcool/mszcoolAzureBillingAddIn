/// <reference path="../../Scripts/FabricUI/MessageBanner.js" />

(function () {
    "use strict";

    var cellToHighlight;
    var messageBanner;

    angular.module('mszAddin').controller('infoController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.init = function () {
                // Reserved for future use, eventually showing who's currently signed-in if someone is signed-in!
            }

            $scope.login = function () {
                $location.path('/login');
            }
        }
    ]);
})();
