(function () {
  'use strict';

  angular.module('app').component('orders', {
    controller: OrdersController,
    controllerAs: 'vm',
    templateUrl: 'app/orders/orders.view.html',
  });

  /** @ngInject */
  function OrdersController($state, $localStorage, OrdersService, $scope, ngDialog) {
    const vm = this;
    vm.orders = [];
    vm.users;

    vm.orderSelected = {};
    vm.indexSelected = null;

    vm.getAllOrders = getAllOrders;
    vm.deleteOrder = deleteOrder;
    vm.reviewOrder = reviewOrder;
    vm.changeToPendingOrder = changeToPendingOrder;

    vm.openRemoveOrderModal = openRemoveOrderModal;
    vm.closeRemoveOrderModal = closeRemoveOrderModal;
    ////
    function initialize() {
      OrdersService.getAllUsers().then(function (users) {
        vm.users = users;
        vm.getAllOrders();
      })
    }

    function getAllOrders() {
      OrdersService.getAllOrders().then(orders => {
        vm.orders = orders.data;
      })
    }

    function reviewOrder(item) {
      item.registeredDate = new Date();
      OrdersService.updateOrder(item).then(_=>{
      })
    }

    function changeToPendingOrder(item) {
      item.registeredDate = null;
      OrdersService.updateOrder(item).then(_ => {
      })
    }

    function deleteOrder() {
      OrdersService.deleteOrder(vm.orderSelected.orderId).then(function () {
        vm.orders.splice(vm.indexSelected, 1);
        vm.closeRemoveOrderModal();
      })
    }

    function openRemoveOrderModal(order, index) {
      vm.orderSelected = order;
      vm.indexSelected = index;
      vm.removeOrderModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: false,
        showClose: false,
        template: 'app/orders/removeOrder.modal.html',
        scope: $scope
      });
    }

    function closeRemoveOrderModal() {
      vm.orderSelected = {};
      vm.indexSelected = null;
      vm.removeOrderModal.close();
    }

    initialize();
  }
})();