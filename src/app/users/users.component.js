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
    vm.useersList = [];
    vm.getUsersList = getUsersList;

    ////
    function initialize() {
      vm.getUsersList();
    }

    initialize();

    function getUsersList() {
      UsersService.getAll().then(response => {
        // console.log(response.users)
        vm.useersList = response.data.users;
      })
    }
  }
})();