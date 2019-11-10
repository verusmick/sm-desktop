(function () {
  'use strict';

  angular.module('app').factory('OrdersService', OrdersService);
  function OrdersService($http, $q, API_ENDPOINT, $localStorage) {
    return {
      getAllOrders: getAllOrders,
      getAllUsers: getAllUsers,
      updateOrder: updateOrder,
      deleteOrder: deleteOrder
    };

    function getAllOrders() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/orders', {
        headers: {
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      })
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getAllUsers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users', {
        headers: {
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      }).then(function (response) {
        deferred.resolve(parseUsers(response.data.data.users));
      }, function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    }

    function parseUsers(usersList) {
      let usersReturn = {};
      _.forEach(usersList, (user, index) => {
        usersReturn[user.ci] = user
      });
      return usersReturn;
    }

    function updateOrder(order) {
      var deferred = $q.defer();
      $http.put(API_ENDPOINT + '/orders', order, {
        headers: {
          userid: $localStorage['usr'].ci,
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      }).then(function (response) {
        deferred.resolve(response);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function deleteOrder(orderId) {
      var deferred = $q.defer();
      $http.delete(API_ENDPOINT + '/orders/' + orderId, {
        headers: {
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      }).then(function (response) {
        deferred.resolve(response);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
  }
})();
