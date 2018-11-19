(function () {
  'use strict';

  angular.module('app').factory('OrdersService', OrdersService);
  function OrdersService($http, $q, API_ENDPOINT) {
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
