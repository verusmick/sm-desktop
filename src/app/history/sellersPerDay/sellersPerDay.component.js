(function () {
  'use strict';

  angular.module('app').component('sellersPerDay', {
    controller: sellersPerDayController,
    controllerAs: 'vm',
    templateUrl: 'app/history/sellersPerDay/sellersPerDay.view.html',
  });

  /** @ngInject */
  function sellersPerDayController(SellersPerDayService) {
    const vm = this;
    vm.sellersList = [];
    vm.selectSeller = selectSeller;
    vm.sellerSelected = {};
    vm.daySelected = '';
    vm.getAll = getAll;

    let map;

    let mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(-16.489568, -68.1148525),
      mapTypeId: 'roadmap'
    };
    let roadTripCoordinates = [];
    /////
    function initialize() {
      getSellers();
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function getAll() {
      if (!vm.daySelected)return false;
      return SellersPerDayService.getAll(vm.daySelected).then(function (response) {
        _.each(response, (value, key) => {
          if (parseFloat(value.latitude) && parseFloat(value.longitude)) {
            roadTripCoordinates.push(
              {lat: parseFloat(value.latitude), lng: parseFloat(value.longitude)}
            )
          }
        });

        let roadTrip = new google.maps.Polyline({
          path: roadTripCoordinates,
          strokeColor: '#FFFF1',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        roadTrip.setMap(map);
      })
    }

    function getSellers() {
      return SellersPerDayService.getSellers().then(response => {
        vm.sellersList = response;
      })
    }

    function selectSeller(seller) {
      _.forEach(vm.sellersList, obj => {
        if (obj.ci !== seller.ci) {
          obj.active = false;
        }
      });

      vm.sellerSelected = seller.active? seller : {};
      vm.daySelected = '';
    }
    initialize();
  }
})();