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

    vm.login = login;

    ////

    function login() {
      var authUserData = {
        ci: vm.ci,
        password: vm.password
      }

      LoginService.login(authUserData).then(function (response) {
        $localStorage['usr'] = response.data.user;
        $localStorage['tk'] = response.data.token;
        $state.go('dashboard.sellersTrack');
      }).catch(function () {

      });
    }
  }
})();