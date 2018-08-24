(function () {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        component: 'home',
      })
      .state('login', {
        url: '/login',
        component: 'login',
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
