(function () {
  'use strict';

  angular.module('app').factory('UsersService', UsersService);
  function UsersService($http, $q, API_ENDPOINT) {
    return {
      login: login
    };

    function login(authUserData) {
      var deferred = $q.defer();
      $http.post(API_ENDPOINT + '/users/authenticate', authUserData)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();
