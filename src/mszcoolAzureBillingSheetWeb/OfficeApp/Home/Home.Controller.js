/// <reference path="../../Scripts/FabricUI/MessageBanner.js" />

(function () {
    "use strict";

    var cellToHighlight;
    var messageBanner;

    angular.module('mszAddin').controller('homeController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.init = function () {
                //showNotification('Hello', 'World');

                //
                // Initializing all Office UI Fabric components
                //
                var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
                for (var i = 0; i < DropdownHTMLElements.length; ++i) {
                    var Dropdown = new fabric['Dropdown'](DropdownHTMLElements[i]);
                }

            }
        }
    ]);

    // Helper function for treating errors
    function errorHandler(error) {
        // Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
        showNotification("Error", error);
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Helper function for displaying notifications
    function showNotification(header, content) {
        $("#notification-header").text(header);
        $("#notification-body").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})();
