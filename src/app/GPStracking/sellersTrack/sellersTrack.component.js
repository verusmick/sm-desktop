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
    vm.sellersSelectedList = [];
    vm.selectAllSellersCheckbox = false;
    vm.markers = [];

    let map;

    vm.getSellers = getSellers;
    vm.selectSeller = selectSeller;
    vm.selectAllSellers = selectAllSellers;
    vm.refreshMarkerList = refreshMarkerList;

    ////////////

    function initialize() {
      vm.getSellers().then(function () {
        vm.selectAllSellers(true);
      });
      initGoogleMaps();
      SellersTrackEvents.start();
      SellersTrackEvents.addListeners({changeLocation: listenCoordEvents});
    }

    function initGoogleMaps() {
      var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(-16.5069882, -68.136291),
        scrollwheel: true,
        mapTypeId: 'roadmap'
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function listenCoordEvents(msg) {
      let data = JSON.parse(msg.data);
      setMarkers(data);
    }

    function setMarkers(event) {
      let cacheMarkersList = [];
      if (vm.markers.length > 0) {
        cacheMarkersList = _.filter(vm.markers, (marker) => {
          return marker.userId !== event.userId && findSellerInCollection(marker.userId);
        })
      }
      let userFind = findSellerInCollection(event.userId);
      if (userFind) {
        event['user'] = userFind;
        cacheMarkersList.push(newMarker(event));
      }
      _.forEach(vm.markers, (marker, index) => {
        if(event.userId === vm.markers[index].userId){
          vm.markers[index].setMap(null)
        }
      });
      setMarkerList(cacheMarkersList)
    }

    function findSellerInCollection(sellerId) {
      return _.find(vm.sellersSelectedList, seller => {
        return seller.ci === sellerId
      })
    }

    function newMarker(obj) {
      let myLatLng = new google.maps.LatLng(obj.latitude, obj.longitude);
      return new google.maps.Marker({
        position: myLatLng,
        map: map,
        label:{
          color: 'black',
          fontWeight: 'bold',
          text: obj.user.firstName,
        },
        icon: {
          labelOrigin: new google.maps.Point(11, 50),
          url: '../../../assets/images/markers/marker_red.png',
          size: new google.maps.Size(22, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(11, 40),
        },
        userId: obj.userId
      });
    }

    function getSellers() {
      return SellersTrackService.getSellers().then(response => {
        vm.sellersList = response;
      })
    }

    function selectAllSellers(setValue) {
      vm.selectAllSellersCheckbox = setValue || vm.selectAllSellersCheckbox;
      _.forEach(vm.sellersList, function (seller) {
        if (seller.gpsStatus.status === 'on') {
          seller['active'] = vm.selectAllSellersCheckbox;
        }
      });
      refreshSellersSelected();
    }

    function selectSeller() {
      refreshSellersSelected();
    }

    function refreshSellersSelected() {
      vm.sellersSelectedList = _.filter(vm.sellersList, {'active': true});
      vm.refreshMarkerList();
    }

    function refreshMarkerList() {
      let cacheMarkersList = [];
      if (vm.markers.length > 0) {
        cacheMarkersList = _.filter(vm.markers, (marker) => {
          return findSellerInCollection(marker.userId);
        })
      }
      _.forEach(vm.markers, (marker, index) => {
        vm.markers[index].setMap(null)
      });

      setMarkerList(cacheMarkersList);
    }

    function setMarkerList(list) {
      vm.markers = [];
      vm.markers = list;
      _.forEach(vm.markers, (marker, index) => {
        marker.addListener('click', function () {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
        });
      });
    }

    initialize();
  }
})();

// Test
// setInterval(function () {
//   setTimeout(function () {
//     setMarkers({
//       userId: "7654321",
//       latitude: -16.4896168,
//       longitude: -68.1148229,
//       timestamp: "2020-01-13 17:09:33"
//     });
//   }, 2000);
//
//   setTimeout(function () {
//     setMarkers({
//       userId: "8413342",
//       latitude: -16.512454,
//       longitude: -68.1148229,
//       timestamp: "2020-01-13 20:09:33"
//     });
//   }, 1500);
//
//   //
//   setTimeout(function () {
//     setMarkers({
//       userId: "7654321",
//       latitude: -16.499616,
//       longitude: -68.124822,
//       timestamp: "2020-01-13 17:09:33"
//     });
//   }, 4000);
//
//   setTimeout(function () {
//     setMarkers({
//       userId: "8413342",
//       latitude: -16.52245,
//       longitude: -68.124822,
//       timestamp: "2020-01-13 20:09:33"
//     });
//   }, 3000);
//   //
//   setTimeout(function () {
//     setMarkers({
//       userId: "7654321",
//       latitude: -16.599616,
//       longitude: -68.224822,
//       timestamp: "2020-01-13 17:09:33"
//     });
//   }, 6000);
//
//   setTimeout(function () {
//     setMarkers({
//       userId: "8413342",
//       latitude: -16.62245,
//       longitude: -68.224822,
//       timestamp: "2020-01-13 20:09:33"
//     });
//   }, 4500);
//
//   //
//   setTimeout(function () {
//     setMarkers({
//       userId: "7654321",
//       latitude: -16.4896168,
//       longitude: -68.1148229,
//       timestamp: "2020-01-13 17:09:33"
//     });
//   }, 8000);
//
//   setTimeout(function () {
//     setMarkers({
//       userId: "8413342",
//       latitude: -16.512454,
//       longitude: -68.1148229,
//       timestamp: "2020-01-13 20:09:33"
//     });
//   }, 6200);
// }, 10000);