(function () {
  'use strict';

  angular.module('app').factory('SellersPerDayService', SellersPerDayService);
  function SellersPerDayService($http, $q, API_ENDPOINT) {
    return {
      getAll: getAll
    };

    function getAll() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/history/sellers')
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();