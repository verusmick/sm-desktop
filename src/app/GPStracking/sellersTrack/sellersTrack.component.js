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

    ////
    function initialize() {
      initGoogleMaps();
    }

    function initGoogleMaps() {

      var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(-16.489568, -68.1148525),
        scrollwheel: false,
        mapTypeId: 'roadmap'
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var roadTripCoordinates = [

        //page 5

        {lat: -16.4904492, lng: -68.113885},
        {lat: -16.4904479, lng: -68.1138907},
        {lat: -16.4904476, lng: -68.1138919},
        {lat: -16.4904482, lng: -68.1139103},
        {lat: -16.4904356, lng: -68.113959},
        {lat: -16.4904056, lng: -68.1139961},
        {lat: -16.4903563, lng: -68.1140079},
        {lat: -16.490292, lng: -68.1140354},
        {lat: -16.4902326, lng: -68.1140593},
        {lat: -16.4901708, lng: -68.114086},
        {lat: -16.490137, lng: -68.1141193},
        {lat: -16.4901297, lng: -68.1141791},

        //page 4
        {lat: -16.4901428, lng: -68.1142289},
        {lat: -16.4901369, lng: -68.1143429},
        {lat: -16.4901286, lng: -68.114489},
        {lat: -16.4901078, lng: -68.1145985},
        {lat: -16.4901036, lng: -68.1146329},
        {lat: -16.4901075, lng: -68.1146647},
        {lat: -16.4901265, lng: -68.1147551},
        {lat: -16.4901434, lng: -68.1147896},
        {lat: -16.4901458, lng: -68.1148395},
        {lat: -16.4901354, lng: -68.1149118},
        {lat: -16.4901097, lng: -68.1149987},
        {lat: -16.490055, lng: -68.1150391},
        //page 3
        {lat: -16.4899746, lng: -68.1149789}

      ];
      var roadTrip = new google.maps.Polyline({
        path: roadTripCoordinates,
        strokeColor: '#FFFF1',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      roadTrip.setMap(map);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-16.489568, -68.1148525),
        title: "Hello World!"
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
    }

    initialize();

  }
})();
