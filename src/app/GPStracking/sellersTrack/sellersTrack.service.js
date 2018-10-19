(function () {
  'use strict';

  angular.module('app').factory('SellersTrackService', SellersTrackService);
  function SellersTrackService($http, $q, API_ENDPOINT) {
    return {
      getSellers: getSellers
    };

    function getSellers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + "/users?roleFilter=visitador")
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();