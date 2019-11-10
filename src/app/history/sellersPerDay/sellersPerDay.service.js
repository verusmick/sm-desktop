(function () {
  'use strict';

  angular.module('app').factory('SellersPerDayService', SellersPerDayService);
  function SellersPerDayService($http, $q, API_ENDPOINT, $localStorage) {
    return {
      getRoutesBySeller: getRoutesBySeller,
      getSellers: getSellers
    };

    function getRoutesBySeller(daySelected, userId) {
      var deferred = $q.defer();
      daySelected = daySelected.toISOString().split("T")[0]
      $http.get(API_ENDPOINT + '/history/sellers?since=' + daySelected + '&until=' + daySelected + '&userId=' + userId, {
        headers: {
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      })
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getSellers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + "/users?roleFilter=visitador", {
        headers: {
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      })
        .then(function (response) {
          let sellers = response.data.data.users;
          deferred.resolve(sellers);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();