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
        auth: true
      })
      .state('dashboard.home', {
        url: '/home',
        component: 'home',
        auth: true
      })
      .state('dashboard.users', {
        url: '/users',
        component: 'users',
        auth: true
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
