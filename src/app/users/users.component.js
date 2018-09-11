(function () {
  'use strict';

  angular.module('app').component('users', {
    controller: UsersController,
    controllerAs: 'vm',
    templateUrl: 'app/users/users.view.html',
  });

  /** @ngInject */
  function UsersController(UsersService, ngDialog, $scope) {
    const vm = this;
    vm.useersList = [];
    vm.userSelected = {};
    vm.getUsersList = getUsersList;
    vm.openRemoveUserModal = openRemoveUserModal;
    vm.closeRemoveUserModal = closeRemoveUserModal;
    vm.removeUser = removeUser;

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

    function openRemoveUserModal(user) {
      vm.userSelected = user;
      vm.removeUserModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: false,
        showClose: false,
        template: 'app/users/removeUser.modal.html',
        scope: $scope
      });
    }

    function closeRemoveUserModal() {
      vm.userSelected = {};
      vm.removeUserModal.close();
    }

    function removeUser() {
      console.log('removeUser')
      var userId = vm.userSelected.ci.slice(0, -2);
      UsersService.deleteUser(userId).then(vm.getUsersList).then(function () {
        vm.closeRemoveUserModal();
      })
    }
  }
})();