(function () {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login',
      })
      .state('dashboard', {
        url: '/dashboard',
        component: 'dashboard',
      })
      .state('dashboard.home', {
        url: '/home',
        component: 'home'
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
