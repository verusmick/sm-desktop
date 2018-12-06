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


    /////
    function initialize() {
      ReportsService.getAllOrders().then(function(response){
        console.log('init report users', response)
      });
    }

    initialize();
  }
})();