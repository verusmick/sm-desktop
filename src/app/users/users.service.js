(function () {
  'use strict';

  angular.module('app').factory('UsersService', UsersService);
  function UsersService($http, $q, API_ENDPOINT, $localStorage) {
    return {
      getAll: getAll,
      deleteUser: deleteUser,
      createUser: createUser,
      updateUser: updateUser,
      getAllRoles: getAllRoles,
      getUserById: getUserById
    };

    function getAll() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users', {
        headers: {
          userName: $localStorage['usr'].firstName + ' ' + $localStorage['usr'].firstSurname,
          ci: $localStorage['usr'].ci
        }
      }).then(function (response) {
          deferred.resolve(response.data);
          let users = response.data;
          let promises = [];
          _.forEach(users, (user, index)=>{
            var promise = getGPSStatus(user.userId);
            promises.push(promise);
          });
          $q.all(promises).then(function (response) {
            console.log('tete');
            console.log(response)
            // _.forEach(users, (user, index) => {
            //
            // })
          });


        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getGPSStatus(userId) {
      var deferred = $q.defer();
      $http.delete(API_ENDPOINT + '/gpsTracking/gpsStatus/' + userId, {
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

    function deleteUser(idUser) {
      var deferred = $q.defer();
      $http.delete(API_ENDPOINT + '/users/' + idUser, {
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

    function createUser(newUserBody) {
      let deferred = $q.defer();
      $http.post(API_ENDPOINT + '/users', newUserBody, {
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

    function updateUser(updateUserBody) {
      let deferred = $q.defer();
      $http.put(API_ENDPOINT + '/users', updateUserBody, {
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

    function getAllRoles() {
      let deferred = $q.defer();
      $http.get(API_ENDPOINT + '/roles', {
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

    function getUserById(userId){
      let deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users/' + userId, {
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
  }
})();
