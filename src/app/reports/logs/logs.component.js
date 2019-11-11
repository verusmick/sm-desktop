(function () {
  'use strict';

  angular.module('app').component('logsReport', {
    controller: logsController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/logs/logs.view.html'
  });

  /** @ngInject */
  function logsController(ReportsService) {
    const vm = this;
    vm.originalLogs = [];
    vm.reverseLogs  = [];
    /////
    function initialize() {
      getLogs()
    }

    function getLogs() {
      ReportsService.getLogs().then(function (response) {
        console.log('Toto-->');
        console.log(response);
        vm.originalLogs = response;
        // vm.reverseLogs = response.reverse();
        // console.log('Reverse');
        // console.log(vm.reverseLogs)
      });
    }
    initialize();
  }
})();