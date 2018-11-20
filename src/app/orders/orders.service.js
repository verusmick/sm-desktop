(function () {
  'use strict';

  angular.module('app').factory('OrdersService', OrdersService);
  function OrdersService($http, $q, API_ENDPOINT) {
    return {
      getAllOrders: getAllOrders,
      getAllUsers: getAllUsers,
      updateOrder:updateOrder,
      deleteOrder:deleteOrder
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
      });
      return deferred.promise;
    }

    function parseUsers(usersList) {
      let usersReturn = {};
      _.forEach(usersList, (user, index)=>{
        usersReturn[user.ci] = user
      });
      return usersReturn;
    }

    function updateOrder(){
      var deferred = $q.defer();
      $http.put(API_ENDPOINT + '/orders').then(function (response) {
        deferred.resolve(parseUsers(response.data.data.users));
      }, function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    }

    function deleteOrder(orderId) {
      var deferred = $q.defer();
      $http.delete(API_ENDPOINT + '/orders/' + orderId).then(function (response) {
        deferred.resolve(response);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
  }
})();
