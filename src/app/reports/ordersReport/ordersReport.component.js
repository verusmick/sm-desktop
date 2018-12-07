(function () {
  'use strict';

  angular.module('app').component('ordersReport', {
    controller: ordersReportController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/ordersReport/ordersReport.view.html'
  });

  /** @ngInject */
  function ordersReportController(ReportsService, ngDialog, $scope) {
    const vm = this;
    vm.sellerSelected = {};
    vm.dateSince = '';
    vm.dateUntil = '';
    vm.sellersList = [];
    vm.reportList = [];

    vm.generateReport = generateReport;
    vm.showChart=showChart;
    /////
    function initialize() {

    }

    function generateReport() {
      ReportsService.getOrders(vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response;
      });
    }

    function showChart() {
      vm.removeUserModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: false,
        showClose: false,
        template: 'app/reports/ordersReport/graph.modal.html',
        scope: $scope
      });
    }

    $scope.showChart = function () {
      setTimeout(function () {
        Highcharts.chart('container', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Numero de Proformas Pendientes y Revisados'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: setSeriesList()
          }]
        });


      }, 200);
    };

    function setSeriesList() {
      let list = [];
      let pendings=0,reviewed=0;

      _.forEach(vm.reportList, item => {
        if(item.registeredDate){
          reviewed++
        }else{
          pendings++
        }
      })

      list.push({
        name: 'Pendiente',
        y: pendings,
        sliced: true,
        selected: true
      })
      list.push({
        name: 'Revisados',
        y: reviewed
      });
      return list
    }
    initialize();
  }
})();