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


    /////
    function initialize() {
      ReportsService.getAllOrders().then(function(response){
        console.log('init report gpsActivatePerSeller', response)
      });
    }

    initialize();
  }
})();