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

    /////
    function initialize() {
      ReportsService.getAllOrders().then(function(response){
        console.log('init report orders report', response)
      });
    }

    initialize();
  }
})();