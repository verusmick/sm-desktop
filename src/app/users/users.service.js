(function () {
  'use strict';

  angular.module('app').factory('UsersService', UsersService);
  function UsersService($http, $q, API_ENDPOINT) {
    return {
      getAll: getAll,
      deleteUser: deleteUser
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

    function deleteUser(idUser) {
      var deferred = $q.defer();
      $http.delete(API_ENDPOINT + '/users/'+idUser)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();
