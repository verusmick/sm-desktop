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
    vm.newUserModel = {
      firstName: '',
      secondName: '',
      firstSurname: '',
      secondSurname: '',
      ciNumber: '',
      bornedIn: '',
      password: '',
      passwordRepeat: '',
      cellphone: '',
      role: {}
    };
    vm.roles = [];
    vm.citiesOption = ['La Paz', 'Oruro', 'Potosi', 'Cochabamba', 'Santa Cruz', 'Beni', 'Pando', 'Tarija', 'Chuquisaca'];

    vm.createNewUser = createNewUser;

    ////
    function initialize() {
      UsersService.getAllRoles().then(response => {
        vm.roles = response.data.roles
      })
    }

    function createNewUser() {
      let newUserBody = parseBeforeToSave(vm.newUserModel);
      UsersService.createUser(newUserBody).then(function (response) {
        $state.go('dashboard.users');
      }).catch(function () {

      });
    }

    function parseBeforeToSave(userObj) {
      return {
        firstName: userObj.firstName,
        secondName: userObj.secondName,
        firstSurname: userObj.firstSurname,
        secondSurname: userObj.secondSurname,
        ci: userObj.ciNumber,
        bornedIn: userObj.bornedIn,
        password: userObj.password,
        cellphone: userObj.cellphone,
        roleId: userObj.role.roleId
      };
    }

    initialize();
  }
})();