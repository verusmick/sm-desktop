(function () {
  'use strict';

  angular.module('app').component('users', {
    controller: UsersController,
    controllerAs: 'vm',
    templateUrl: 'app/users/users.view.html',
  });

  /** @ngInject */
  function UsersController($state, $localStorage, UsersService) {
    const vm = this;
    vm.ci = '';
    vm.password = '';

    vm.login = login;

    ////

    function login() {

    }
  }
})();