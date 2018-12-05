(function () {
  'use strict';

  angular.module('app').factory('ReportsService', ReportsService);
  function ReportsService($http, $q, API_ENDPOINT) {
    return {
      getAllOrders: getAllOrders
    };

    function getAllOrders() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/orders')
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();
