(function () {
  'use strict';

  angular.module('app').component('usersReport', {
    controller: usersReportController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/usersReport/usersReport.view.html'
  });

  /** @ngInject */
  function usersReportController(ReportsService) {
    const vm = this;
    vm.reportList = [];
    vm.roleSelected = {};
    vm.bornedCity = '';
    vm.rolesList = [];
    vm.bornedCitiesList = ['La Paz', 'Oruro', 'Potosi', 'Cochabamba', 'Santa Cruz', 'Beni', 'Pando', 'Tarija', 'Chuquisaca'];

    function initialize() {
      getRolesList();
      generateReport();
    }

    function getRolesList() {
      ReportsService.getRoles().then(response => {
        vm.rolesList = response;
      });
    }

    function generateReport() {
      ReportsService.getUsers().then(response => {
        vm.reportList = response;
      });
    }

    initialize();
  }
})();