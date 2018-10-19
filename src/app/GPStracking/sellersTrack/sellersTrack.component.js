(function () {
  'use strict';

  angular.module('app').component('sellersTrack', {
    controller: sellersTrackController,
    controllerAs: 'vm',
    templateUrl: 'app/GPStracking/sellersTrack/sellersTrack.view.html',
  });

  /** @ngInject */
  function sellersTrackController(SellersTrackEvents, SellersTrackService) {
    const vm = this;
    vm.sellersList = [];
    var map;
    var marker = null; // Create a marker array to hold your markers

    vm.getSellers = getSellers;

    ////////////

    function initialize() {
      vm.getSellers();
      initGoogleMaps();
      SellersTrackEvents.start();
      SellersTrackEvents.addListeners({message: getCoordinates});
    }

    function initGoogleMaps() {
      var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(-15.8277324, -68.9899946),
        scrollwheel: false,
        mapTypeId: 'roadmap'
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function getCoordinates(msg) {
      console.log('--->', JSON.parse(msg.data))
      setMarkers(JSON.parse(msg.data))
    }

    function setMarkers(coordinates) {
      var beach = coordinates;
      var myLatLng = new google.maps.LatLng(beach.latitude, beach.longitude);

      if (marker != null) {
        marker.setMap(null);
      }

      marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: beach[0],
        zIndex: 33.3
      });
    }

    function getSellers() {
      SellersTrackService.getSellers().then(response=>{
        vm.sellersList = response.data.users
      })
    }

    initialize();
  }
})();