(function () {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login'
        // resourceName: ''
      })
      .state('dashboard', {
        url: '/dashboard',
        component: 'dashboard',
        auth: true
        // resourceName: ''
      })
      .state('dashboard.home', {
        url: '/home',
        component: 'home',
        auth: true
        // resourceName: ''
      })
      .state('dashboard.users', {
        url: '/users',
        component: 'users',
        auth: true,
        resourceName: 'desk_users'
      })
      .state('dashboard.newUser', {
        url: '/newUser',
        component: 'newUser',
        auth: true,
        resourceName: 'desk_users'
      })
      .state('dashboard.sellersTrack', {
        url: '/sellersTrack',
        component: 'sellersTrack',
        auth: true,
        resourceName: 'desk_geoSellers'
      })
      .state('dashboard.sellersPerDay', {
        url: '/sellersPerDay',
        component: 'sellersPerDay',
        auth: true,
        resourceName: 'desk_historyPerDaySellers'
      });

    $urlRouterProvider.otherwise('/login');
  }
})();
