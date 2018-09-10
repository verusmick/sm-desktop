(function () {
  'use strict';

  angular.module('app').factory('UsersService', UsersService);
  function UsersService($http, $q, API_ENDPOINT) {
    return {
      getAll: getAll
    };

    function getAll() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users')
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();
