(function () {
  'use strict';

  angular.module('app').component('bestSellers', {
    controller: bestSellersController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/ordersReport/ordersReport.view.html'
  });

  /** @ngInject */
  function bestSellersController(ReportsService) {
    const vm = this;

    /////
    function initialize() {
      ReportsService.getAllOrders().then(function (response) {
        console.log('init report best Sellers', response)
      });
    }

    initialize();
  }
})();