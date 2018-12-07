(function () {
  'use strict';

  angular.module('app').component('bestSellers', {
    controller: bestSellersController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/bestSellers/bestSellers.view.html'
  });

  /** @ngInject */
  function bestSellersController(ReportsService, ngDialog, $scope) {
    const vm = this;
    vm.sellerSelected = {};
    vm.dateSince = '';
    vm.dateUntil = '';
    vm.sellersList = [];
    vm.reportList = [];

    vm.generateReport = generateReport;
    vm.showChart = showChart;
    /////
    function initialize() {

    }

    function generateReport() {
      ReportsService.bestSellers(vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response;
        console.log(vm.reportList);
      });
    }

    function showChart() {
      vm.removeUserModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: false,
        showClose: false,
        template: 'app/reports/bestSellers/graph.modal.html',
        scope: $scope
      });
    }

    $scope.showChart = function () {
      let list = setSeriesList();
      setTimeout(function () {
        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Mejores Visitadores'
          },

          xAxis: {
            title: {
              text: 'Visitadores'
            }

          },
          yAxis: {
            title: {
              text: 'Monto en Bs de Ventas'
            }

          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}Bs.'
              }
            }
          },
          series: [
            {
              "name": "Visitador",
              "colorByPoint": true,
              "data": list
            }
          ]
        });

      }, 200);
    };

    function setSeriesList() {
      let list = []
      _.forEach(vm.reportList, item => {
        list.push({
          "name": item.user.firstName + ' '+item.user.firstSurname,
          "y": item.totalAmount,
          "drilldown": item.user.firstName + ' '+item.user.firstSurname
        })
      })
      return list
    }

    initialize();
  }
})();