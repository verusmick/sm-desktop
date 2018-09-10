(function () {
  'use strict';

  angular.module('app').component('newUser', {
    controller: NewUserController,
    controllerAs: 'vm',
    templateUrl: 'app/users/newUser/newUser.view.html',
  });

  /** @ngInject */
  function NewUserController($state, $localStorage, UsersService) {
    const vm = this;
    vm.ci = '';
    vm.password = '';

    vm.login = login;

    ////

    function login() {

    }
  }
})();