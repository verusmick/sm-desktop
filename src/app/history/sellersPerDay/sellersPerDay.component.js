(function () {
  'use strict';

  angular.module('app').component('sellersPerDay', {
    controller: sellersPerDayController,
    controllerAs: 'vm',
    templateUrl: 'app/history/sellersPerDay/sellersPerDay.view.html',
  });

  /** @ngInject */
  function sellersPerDayController(SellersPerDayService, $filter, ngDialog, $scope) {
    const vm = this;
    vm.sellersList = [];
    vm.selectSeller = selectSeller;
    vm.sellerSelected = {};
    vm.daySelected = '';
    vm.markers = [];
    vm.roadTrip;

    vm.getRoutesBySeller = getRoutesBySeller;

    let map;

    /////
    function initialize() {
      getSellers();
      let mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(-16.5069882, -68.136291),
        mapTypeId: 'roadmap'
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function getRoutesBySeller() {
      if (!vm.daySelected)return false;
      if(vm.roadTrip){
        vm.roadTrip.setMap(null);
        vm.roadTrip = {}
      }
      let roadTripCoordinates = [];
      return SellersPerDayService.getRoutesBySeller(vm.daySelected, vm.sellerSelected.ci).then(function (response) {
        if(response.length === 0){
          notExistCoordinatesWarning();
        }
        _.each(response, (value, key) => {
          if (parseFloat(value.latitude) && parseFloat(value.longitude)) {
            roadTripCoordinates.push(
              {lat: parseFloat(value.latitude), lng: parseFloat(value.longitude), userId:value.user_id, timestamp:value.timestamp}
            )
          }
        });

        vm.roadTrip = new google.maps.Polyline({
          path: roadTripCoordinates,
          strokeColor: '#FFFF1',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        vm.roadTrip.setMap(map);
        setMarkers(roadTripCoordinates[0], roadTripCoordinates[roadTripCoordinates.length - 1]);
      })
    }

    function setMarkers(firstCoord, lastCoord) {
      _.forEach(vm.markers, (marker, index) => {
        vm.markers[index].setMap(null)
      });
      vm.markers = [];
      vm.test = $filter('date')(firstCoord.timestamp, 'medium');
      vm.markers.push(newMarker(firstCoord));
      vm.markers.push(newMarker(lastCoord));
      _.forEach(vm.markers, (marker, index) => {
        marker.addListener('click', function () {
          map.setZoom(16);
          map.setCenter(marker.getPosition());
        });
      });

    }

    function newMarker(obj) {
      let myLatLng = new google.maps.LatLng(obj.lat, obj.lng);
      return new google.maps.Marker({
        position: myLatLng,
        map: map,
        label: {
          color: 'black',
          fontWeight: 'bold',
          text: $filter('date')(obj.timestamp, 'medium'),
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

    function notExistCoordinatesWarning() {
      let notExistCoordinatesWarningModal = ngDialog.open({
        disableAnimation: true,
        closeByDocument: true,
        showClose: true,
        template: 'app/history/sellersPerDay/notExistCoordinates.modal.html',
        scope: $scope
      });
    }
    initialize();
  }
})();