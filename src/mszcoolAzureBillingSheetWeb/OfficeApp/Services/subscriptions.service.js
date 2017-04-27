(function () {
    "use strict";

    angular.module('mszAddin')
        .service('subscriptionsService', ['$http', '$q', subscriptionsService]);

    function subscriptionsService($http, $q) {

        var authToken;

        return {
            getSubscriptions: getSubscriptions
        };

        function getSubscriptions(authToken) {
            var deferrer = $q.defer();

            var request = {
                method: "GET",
                url: "https://management.azure.com/subscriptions?api-version=2016-06-01",
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            };

            $http(request).then(
                function successCallback(response) {
                    deferrer.resolve(response.data.value);
                },
                function errorCallback(response) {
                    deferrer.reject(response);
                }
            );
            return deferrer.promise;
        }
    }

})();