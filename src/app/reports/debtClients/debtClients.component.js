(function () {
  'use strict';

  angular.module('app').component('debtClients', {
    controller: debtClientsController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/debtClients/debtClients.view.html'
  });

  /** @ngInject */
  function debtClientsController(ReportsService, $stateParams, ngDialog, $scope) {
    const vm = this;
    vm.urlDebtParam = $stateParams.debtLimit === 'yes' ? true : false;

    vm.debtClients = [];
    vm.topTenClientsDebt = [];
    vm.debtClientsSorted = [];
    vm.searchTerm = '';
    vm.lowerUpperDebtParam = '';

    vm.getDebtClients = getDebtClients;
    vm.changeSearchTerm = changeSearchTerm;
    vm.lowerUpperDebt = lowerUpperDebt;
    vm.topDebtClients = topDebtClients;

    /////
    function initialize() {
      vm.getDebtClients('', vm.urlDebtParam ? '>=20000' : null).then(function () {
        vm.debtClientsSorted = vm.debtClients.sort((a, b) => {
          return b.deuda_actual - a.deuda_actual;
        });
        vm.topTenClientsDebt = vm.debtClientsSorted.slice(0, 10);
      });
      vm.lowerUpperDebtParam = vm.urlDebtParam ? '>=20000' : '';
    }

    function getDebtClients(searchTerm, debtParam) {
      debtParam = debtParam ? debtParam : '>=1';
      return ReportsService.getClients(searchTerm || '',debtParam).then(function (response) {
        vm.debtClients = response;
      });
    }

    function changeSearchTerm() {
      vm.lowerUpperDebt();
    }

    function lowerUpperDebt() {
      vm.getDebtClients(vm.searchTerm, vm.lowerUpperDebtParam)
    }

    function topDebtClients() {
      vm.removeUserModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: false,
        showClose: false,
        template: 'app/reports/bestSellers/graph.modal.html',
        scope: $scope
      });
    }

    function parseTopTenClientsDebt (){
      let list = []
      _.forEach(vm.topTenClientsDebt, item => {
        list.push({
          "name": item.razon_social,
          "y": item.deuda_actual,
          "drilldown": item.tipo
        })
      });
      return list;
    }

    $scope.showChart = function () {
      let list = parseTopTenClientsDebt();
      setTimeout(function () {
        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Top de clientes con deuda Superior a 20.000 Bs.'
          },

          xAxis: {
            title: {
              text: 'Clientes'
            }

          },
          yAxis: {
            title: {
              text: 'Todal de Deuda Bs. || (k) = Miles'
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
              "name": "Monto Total en Bs.",
              "colorByPoint": true,
              "data": list
            }
          ]
        });

      }, 200);
    };

    initialize();
  }
})();