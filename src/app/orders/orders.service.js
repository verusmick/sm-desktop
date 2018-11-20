(function () {
  'use strict';

  angular.module('app').factory('OrdersService', OrdersService);
  function OrdersService($http, $q, API_ENDPOINT) {
    return {
      getAllOrders: getAllOrders,
      getAllUsers: getAllUsers
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

    function getAllUsers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users').then(function (response) {
        deferred.resolve(parseUsers(response.data.data.users));
      }, function (response) {
        deferred.reject(response);
      })
      return deferred.promise;
    }

    function parseUsers(usersList) {
      let usersReturn = {};
      _.forEach(usersList, (user, index)=>{
        usersReturn[user.ci] = user
      });
      return usersReturn;
    }
  }
})();
