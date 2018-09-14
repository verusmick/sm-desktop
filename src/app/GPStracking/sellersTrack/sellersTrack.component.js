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

    var coordinates = [
      {x: -16.4904492, y: -68.113885},
      {x: -16.4904479, y: -68.1138907},
      {x: -16.4904476, y: -68.1138919},
      {x: -16.4904482, y: -68.1139103},
      {x: -16.4904356, y: -68.113959},
      {x: -16.4904056, y: -68.1139961},
      {x: -16.4903563, y: -68.1140079},
      {x: -16.490292, y: -68.1140354},
      {x: -16.4902326, y: -68.1140593},
      {x: -16.4901708, y: -68.114086},
      {x: -16.490137, y: -68.1141193},
      {x: -16.4901297, y: -68.1141791},
      {x: -16.4901428, y: -68.1142289},
      {x: -16.4901369, y: -68.1143429},
      {x: -16.4901286, y: -68.114489},
      {x: -16.4901078, y: -68.1145985},
      {x: -16.4901036, y: -68.1146329},
      {x: -16.4901075, y: -68.1146647},
      {x: -16.4901265, y: -68.1147551},
      {x: -16.4901434, y: -68.1147896},
      {x: -16.4901458, y: -68.1148395},
      {x: -16.4901354, y: -68.1149118},
      {x: -16.4901097, y: -68.1149987},
      {x: -16.490055, y: -68.1150391},
      {x: -16.4899746, y: -68.1149789}
    ];

    var map=null;
    var mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(-16.489568, -68.1148525),
      scrollwheel: false,
      mapTypeId: 'roadmap'
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    ////
    function initialize() {
      initGoogleMaps();
    }

    function initGoogleMaps() {

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
//
//
//
// var roadTripCoordinates = [
//
//   //page 5
//
//   {lat: -16.4904492, lng: -68.113885 },
//   {lat: -16.4904479, lng: -68.1138907},
//   {lat: -16.4904476, lng: -68.1138919},
//   {lat: -16.4904482, lng: -68.1139103},
//   {lat: -16.4904356, lng: -68.113959 },
//   {lat: -16.4904056, lng: -68.1139961},
//   {lat: -16.4903563, lng: -68.1140079},
//   {lat: -16.490292 , lng: -68.1140354},
//   {lat: -16.4902326, lng: -68.1140593},
//   {lat: -16.4901708, lng: -68.114086 },
//   {lat: -16.490137 , lng: -68.1141193},
//   {lat: -16.4901297, lng: -68.1141791},
//
// //page 4
//   {lat: -16.4901428, lng: -68.1142289},
//   {lat: -16.4901369, lng: -68.1143429},
//   {lat: -16.4901286, lng: -68.114489},
//   {lat: -16.4901078, lng: -68.1145985},
//   {lat: -16.4901036, lng: -68.1146329},
//   {lat: -16.4901075, lng: -68.1146647},
//   {lat: -16.4901265, lng: -68.1147551},
//   {lat: -16.4901434, lng: -68.1147896},
//   {lat: -16.4901458, lng: -68.1148395},
//   {lat: -16.4901354, lng: -68.1149118},
//   {lat: -16.4901097, lng: -68.1149987},
//   {lat: -16.490055 , lng: -68.1150391},
// //page 3
//   {lat: -16.4899746, lng: -68.1149789}
//
// ];
// var roadTrip = new google.maps.Polyline({
//   path: roadTripCoordinates,
//   strokeColor: '#FFFF1',
//   strokeOpacity: 1.0,
//   strokeWeight: 2
// });
//
// roadTrip.setMap(map);