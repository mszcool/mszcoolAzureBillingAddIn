(function () {
    "use strict";

    angular.module('mszAddin')
        .service('subscriptionsService', ['$http', '$q', subscriptionsService]);

    function subscriptionsService($http, $q) {

        var authToken;

        return {
            getSubscriptions: getSubscriptions
        };

        function getSubscriptions() {
        }
    }

})();