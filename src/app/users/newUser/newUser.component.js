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
      ciExtended: '',
      password: '',
      passwordRepeat: '',
      cellphone: '',
    };

    vm.createNewUser = createNewUser;

    ////

    function createNewUser() {
      console.log(vm.newUserModel)
      let newUserBody = {
        firstName: vm.newUserModel.firstName,
        secondName: vm.newUserModel.secondName,
        firstSurname: vm.newUserModel.firstSurname,
        secondSurname: vm.newUserModel.secondSurname,
        ci: vm.newUserModel.ciNumber + vm.newUserModel.ciExtended,
        password: vm.newUserModel.password,
        cellphone: vm.newUserModel.cellphone,
      };
      UsersService.createUser(newUserBody).then(function (response) {
        $state.go('dashboard.users');
      }).catch(function () {

      });
    }
  }
})();