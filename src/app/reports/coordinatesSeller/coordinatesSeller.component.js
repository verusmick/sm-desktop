(function () {
  'use strict';

  angular.module('app').component('coordinatesSeller', {
    controller: coordinatesSellerController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/coordinatesSeller/coordinatesSeller.view.html'
  });

  /** @ngInject */
  function coordinatesSellerController(ReportsService) {
    const vm = this;
    vm.sellerSelected = {};
    vm.dateSince = '';
    vm.dateUntil = '';
    vm.sellersList = [];
    vm.reportList = [];

    vm.getSellers = getSellers;
    vm.generateReport = generateReport;
    vm.changeSeller = changeSeller;

    /////
    function initialize() {
      vm.getSellers();
    }

    function getSellers() {
      ReportsService.getSellers().then(function (response) {
        vm.sellersList = response;
      });
    }

    function generateReport() {
      ReportsService.getCoordinatesReport(vm.sellerSelected.ci, vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response;
      });
    }

    function changeSeller() {
      vm.reportList = [];
    }

    initialize();
  }
})();