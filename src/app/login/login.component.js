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

    vm.change = change;
    vm.login = login;

    ////

    function change() {
      vm.flagValidation = false
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