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

    let map;

    var mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(-16.489568, -68.1148525),
      mapTypeId: 'roadmap'
    };
    var roadTripCoordinates = []
    /////

    function initialize() {
      getAll().then(function () {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var roadTrip = new google.maps.Polyline({
          path: roadTripCoordinates,
          strokeColor: '#FFFF1',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        roadTrip.setMap(map);
      });
    }


    function getAll() {
      return SellersPerDayService.getAll().then(function (response) {
        console.log('----->', response);
        _.each(response, (value, key) => {
          if (parseFloat(value.latitude) && parseFloat(value.longitude)) {
            roadTripCoordinates.push(
              {lat: parseFloat(value.latitude), lng: parseFloat(value.longitude)}
            )
          }
        })
        // roadTripCoordinates = response;
      })
    }

    initialize();
  }
})();