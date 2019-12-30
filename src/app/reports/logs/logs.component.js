(function () {
  'use strict';

  angular.module('app').component('logsReport', {
    controller: logsController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/logs/logs.view.html'
  });

  /** @ngInject */
  function logsController(ReportsService) {
    const vm = this;
    vm.originalLogs = [];
    vm.reverseLogs  = [];
    vm.userList = [];
    vm.userSelected = undefined;
    vm.dateSince = '';
    vm.dateUntil = '';
    vm.getUsers = getUsers;
    /////
    function initialize() {
      vm.getUsers();
      getLogs()
    }

    function getUsers() {
      ReportsService.getUsers().then(function (response) {
        response.forEach(function (item, index) {
          response[index]['label'] = item.firstName + ' ' + item.firstSurname;
        });
        vm.userList = response;
      });
    }

    function getLogs() {
      ReportsService.getLogs().then(function (response) {
        vm.originalLogs = response;
      });
    }

    initialize();
  }
})();