(function () {
  'use strict';

  angular.module('app').component('bestSellers', {
    controller: bestSellersController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/bestSellers/bestSellers.view.html'
  });

  /** @ngInject */
  function bestSellersController(ReportsService) {
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
      ReportsService.bestSellers(vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response;
        console.log('vm.reportList', vm.reportList);
      });
    }

    initialize();
  }
})();