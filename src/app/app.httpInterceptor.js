(function () {
  'use strict';

  angular.module('app').factory(httpInterceptor);

  angular.module('app').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(httpInterceptor);
  }]);

  /** @ngInject */
  function httpInterceptor($q, $rootScope, $location, $localStorage, $state) {
    return {
      request: function (config) {
        config.headers['x-access-token'] = $localStorage['tk'];
        return config || $q.when(config);
      },
      responseError: function (response) {
        if(response.status === 403){
          delete $localStorage['usr'];
          delete $localStorage['tk'];
          $state.go('login');
        }
        return $q.reject('response',response);
      }
    }
  }
})();
