(function () {
  'use strict';

  angular.module('app').component('login', {
    controller: LoginController,
    controllerAs: 'vm',
    templateUrl: 'app/login/login.view.html',
  });

  /** @ngInject */
  function LoginController($log, $rootScope, $translate, SAMPLE_CONSTANT) {
    const vm = this;

    // Scope variables go here:
    // vm.variable = 'value';

    vm.showSampleConstant = showSampleConstant;
    vm.switchLanguage = switchLanguage;

    activate();

    function activate() {
      $log.debug('home activated');
    }

    function showSampleConstant() {
      alert(SAMPLE_CONSTANT);
    }

    function switchLanguage(language) {
      $translate.use(language);
    }

  }

})();
