(function () {
  'use strict';

  angular.module('app').component('gpsActivatePerSeller', {
    controller: gpsActivatePerSellerController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/gpsActivatePerSeller/gpsActivatePerSeller.view.html'
  });

  /** @ngInject */
  function gpsActivatePerSellerController(ReportsService) {
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
      ReportsService.getStatusGpsPerSeller(vm.sellerSelected.ci, vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response.data;
      });
    }

    function changeSeller() {
      vm.reportList = [];
    }

    initialize();
  }
})();