(function () {
  'use strict';

  angular.module('app').component('coordinatesSeller', {
    controller: coordinatesSellerController,
    controllerAs: 'vm',
    templateUrl: 'app/reports/coordinatesSeller/coordinatesSeller.view.html'
  });

  /** @ngInject */
  function coordinatesSellerController(ReportsService, ngDialog, $scope) {
    const vm = this;
    vm.sellerSelected = {};
    vm.dateSince = '';
    vm.dateUntil = '';
    vm.sellersList = [];
    vm.reportList = [];
    let map;

    vm.getSellers = getSellers;
    vm.generateReport = generateReport;
    vm.changeSeller = changeSeller;
    vm.openPositionModal = openPositionModal;

    /////
    function initialize() {
      vm.getSellers();
    }

    function getSellers() {
      ReportsService.getSellers().then(function (response) {
        vm.sellersList = response;
      });
    }

    function generateReport() {
      ReportsService.getCoordinatesReport(vm.sellerSelected.ci, vm.dateSince, vm.dateUntil).then(response => {
        vm.reportList = response;
      });
    }

    function changeSeller() {
      vm.reportList = [];
    }

    function newMarker(latitude, longitude) {
      let myLatLng = new google.maps.LatLng(latitude, longitude);
      return new google.maps.Marker({
        position: myLatLng,
        map: map,
        label:{
          color: 'black',
          fontWeight: 'bold',
        },
        icon: {
          labelOrigin: new google.maps.Point(11, 50),
          url: '../../../assets/images/markers/marker_red.png',
          size: new google.maps.Size(22, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(11, 40),
        }
      });
    }

    function initGoogleMaps(latitude, longitude) {
      console.log('init map')
      var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(latitude, longitude),
        scrollwheel: true,
        mapTypeId: 'roadmap'
      };
      map = new google.maps.Map(document.getElementById('mapModal'), mapOptions);
    }
    function  openPositionModal(latitude, longitude) {
      let notExistCoordinatesWarningModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: true,
        showClose: true,
        template: 'app/reports/coordinatesSeller/showLocation.modal.html',
        scope: $scope
      });


      setTimeout(function(){
        initGoogleMaps(latitude, longitude);
        newMarker(latitude, longitude)
      },200)


    }



    initialize();
  }
})();