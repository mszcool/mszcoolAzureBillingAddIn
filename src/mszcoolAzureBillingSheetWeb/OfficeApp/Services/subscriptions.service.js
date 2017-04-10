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
            //var url = "https://graph.microsoft.com/v1.0/me";
            var url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/subscriptions?token=' + authToken;
            $http.get(url).then(
                function successCallback(response) {
                    deferrer.resolve(response);
                },
                function errorCallback(response) {
                    deferrer.reject(response);
                }
            );
            return deferrer.promise;
        }
    }

})();