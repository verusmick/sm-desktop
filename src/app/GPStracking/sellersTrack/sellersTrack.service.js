(function () {
  'use strict';

  angular.module('app').factory('SellersTrackService', SellersTrackService);
  function SellersTrackService($http, $q, API_ENDPOINT) {
    return {
      getSellers: getSellers
    };

    function getSellers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + "/users?roleFilter=visitador")
        .then(function (response) {
          let sellers = response.data.data.users;
          let promises = [];
          _.forEach(sellers, (seller, index)=>{
            var promise = getGPSStatus(seller.ci);
            promises.push(promise);
          });
          $q.all(promises).then(function (response) {
            _.forEach(sellers, (seller, index) => {
              sellers[index]['gpsStatus'] = response[index].status?  response[index]: {status: "off"};

            })
            deferred.resolve(sellers);
          });
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getGPSStatus(userId) {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/gpsTracking/gpsStatus/' + userId)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }
})();