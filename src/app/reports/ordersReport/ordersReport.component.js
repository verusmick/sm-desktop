(function () {
  'use strict';

  angular.module('app').component('ordersReport', {
    controller: ordersReportController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/ordersReport/ordersReport.view.html'
  });

  /** @ngInject */
  function ordersReportController(ReportsService) {
    const vm = this;
    vm.sellerSelected = {};
    vm.dateSince = '';
    vm.dateUntil = '';
    vm.sellersList = [];
    vm.reportList = [];

    vm.generateReport = generateReport;
    /////
    function initialize() {

    }

    function generateReport() {
      ReportsService.getOrders(vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response;
      });
    }

    initialize();
  }
})();