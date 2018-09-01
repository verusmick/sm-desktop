(function () {
  'use strict';

  angular.module('app').component('dashboard', {
    controller: DashboardController,
    controllerAs: 'vm',
    templateUrl: 'app/dashboard/dashboard.view.html',
  });

  /** @ngInject */
  function DashboardController($log, $rootScope, $translate, SAMPLE_CONSTANT) {
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
