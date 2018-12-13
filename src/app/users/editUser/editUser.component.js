(function () {
  'use strict';

  angular.module('app').component('editUser', {
    controller: editUserController,
    controllerAs: 'vm',
    templateUrl: 'app/users/editUser/editUser.view.html',
  });

  /** @ngInject */
  function editUserController($state, $localStorage, UsersService, $stateParams) {
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
        UsersService.getUserById($stateParams.userId).then(function(data){
          console.log('--->',data);
          if(data.status === 'error'){
            $state.go('dashboard.users');
          }else{

          }
        })
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