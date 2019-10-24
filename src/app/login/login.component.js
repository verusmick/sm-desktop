(function () {
  'use strict';

  angular.module('app').component('login', {
    controller: LoginController,
    controllerAs: 'vm',
    templateUrl: 'app/login/login.view.html',
  });

  /** @ngInject */
  function LoginController($state, $localStorage, LoginService) {
    const vm = this;
    vm.ci = '';
    vm.password = '';
    vm.flagValidation = false;
    vm.showPassword = false;
    vm.passwordTypeInput = 'password';

    vm.change = change;
    vm.showHidePassword = showHidePassword;
    vm.login = login;

    ////

    function change() {
      vm.flagValidation = false
    }

    function showHidePassword() {
      vm.showPassword = !vm.showPassword;
      vm.passwordTypeInput = vm.showPassword ?  'text':'password';
    }

    function login() {
      var authUserData = {
        ci: vm.ci,
        password: vm.password
      }

      LoginService.login(authUserData).then(function (response) {
        if (response.status === 'error') {
          vm.flagValidation = true
        } else {
          $localStorage['usr'] = response.data.user;
          $localStorage['tk'] = response.data.token;
          $state.go('dashboard.sellersTrack');
        }
      }).catch(function () {

      });
    }
  }
})();