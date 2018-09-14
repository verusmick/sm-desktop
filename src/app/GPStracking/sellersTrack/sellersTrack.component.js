(function () {
  'use strict';

  angular.module('app').component('sellersTrack', {
    controller: sellersTrackController,
    controllerAs: 'vm',
    templateUrl: 'app/GPStracking/sellersTrack/sellersTrack.view.html',
  });

  /** @ngInject */
  function sellersTrackController() {
    const vm = this;

    vm.reloadMarkers = reloadMarkers;

    var coordinates = [
      {latitude: -16.4904492, longitude: -68.113885},
      {latitude: -16.4904479, longitude: -68.1138907},
      {latitude: -16.4904476, longitude: -68.1138919},
      {latitude: -16.4904482, longitude: -68.1139103},
      {latitude: -16.4904356, longitude: -68.113959},
      {latitude: -16.4904056, longitude: -68.1139961},
      {latitude: -16.4903563, longitude: -68.1140079},
      {latitude: -16.490292, longitude: -68.1140354},
      {latitude: -16.4902326, longitude: -68.1140593},
      {latitude: -16.4901708, longitude: -68.114086},
      {latitude: -16.490137, longitude: -68.1141193},
      {latitude: -16.4901297, longitude: -68.1141791},
      {latitude: -16.4901428, longitude: -68.1142289},
      {latitude: -16.4901369, longitude: -68.1143429},
      {latitude: -16.4901286, longitude: -68.114489},
      {latitude: -16.4901078, longitude: -68.1145985},
      {latitude: -16.4901036, longitude: -68.1146329},
      {latitude: -16.4901075, longitude: -68.1146647},
      {latitude: -16.4901265, longitude: -68.1147551},
      {latitude: -16.4901434, longitude: -68.1147896},
      {latitude: -16.4901458, longitude: -68.1148395},
      {latitude: -16.4901354, longitude: -68.1149118},
      {latitude: -16.4901097, longitude: -68.1149987},
      {latitude: -16.490055, longitude: -68.1150391},
      {latitude: -16.4899746, longitude: -68.1149789}
    ];
    var map;
    var marker = []; // Create a marker array to hold your markers

    function initialize() {
      initGoogleMaps();
    }

    function initGoogleMaps() {
      var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(-16.4904492, -68.113885),
        scrollwheel: false,
        mapTypeId: 'roadmap'
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setMarkers();
    }

    var set = 0;

    function setMarkers() {
      var beach = coordinates[set]
      var myLatLng = new google.maps.LatLng(beach.latitude, beach.longitude);
      marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: beach[0]
        // zIndex: beach[3]
      });
      set++
      // Push marker to markers array
    }

    function reloadMarkers() {
      // Loop through markers and set map to null for each
      if (marker != null) {
        marker.setMap(null);
      }
      // Reset the markers array
      marker = [];
      // Call set markers to re-add markers
      setMarkers();
    }

    initialize();
  }
})();