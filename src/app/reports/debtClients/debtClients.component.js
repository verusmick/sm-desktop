(function () {
  'use strict';

  angular.module('app').component('debtClients', {
    controller: debtClientsController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/debtClients/debtClients.view.html'
  });

  /** @ngInject */
  function debtClientsController(ReportsService, $stateParams) {
    const vm = this;
    vm.urlDebtParam = $stateParams.debtLimit === 'yes' ? true : false;

    vm.debtClients = [];
    vm.searchTerm = '';
    vm.lowerUpperDebtParam = '';

    vm.getDebtClients = getDebtClients;
    vm.changeSearchTerm = changeSearchTerm;
    vm.lowerUpperDebt = lowerUpperDebt;

    /////
    function initialize() {
      vm.getDebtClients('',vm.urlDebtParam? '>=20000':null);
      vm.lowerUpperDebtParam = vm.urlDebtParam ? '>=20000' : '';
    }

    function getDebtClients(searchTerm, debtParam) {
      debtParam = debtParam ? debtParam : '>=1';
      ReportsService.getClients(searchTerm || '',debtParam).then(function (response) {
        vm.debtClients = response;
      });
    }

    function changeSearchTerm() {
      vm.lowerUpperDebt();
    }

    function lowerUpperDebt() {
      vm.getDebtClients(vm.searchTerm, vm.lowerUpperDebtParam)
    }

    initialize();
  }
})();