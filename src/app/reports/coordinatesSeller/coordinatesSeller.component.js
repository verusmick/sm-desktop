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


    /////
    function initialize() {
      ReportsService.getAllOrders().then(function(response){
        console.log('init report coordinatesSeller', response)
      });
    }

    initialize();
  }
})();