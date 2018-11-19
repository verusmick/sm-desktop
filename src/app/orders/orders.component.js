(function () {
  'use strict';

  angular.module('app').component('orders', {
    controller: OrdersController,
    controllerAs: 'vm',
    templateUrl: 'app/orders/orders.view.html',
  });

  /** @ngInject */
  function OrdersController($state, $localStorage, OrdersService) {
    const vm = this;
    vm.orders = [];

    vm.getAllOrders = getAllOrders;
    ////
    function initialize() {
      vm.getAllOrders();
    }

    function getAllOrders() {
      OrdersService.getAllOrders().then(orders => {
        vm.orders = orders.data;
      })
    }

    initialize();
  }
})();