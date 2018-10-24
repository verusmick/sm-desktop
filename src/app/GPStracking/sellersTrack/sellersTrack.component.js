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

    ////////////

    function initialize() {
      vm.getSellers().then(function(){
        vm.selectAllSellers(true);
      });
      initGoogleMaps();
      SellersTrackEvents.start();
      SellersTrackEvents.addListeners({changeLocation: listenCoordEvents});
    }

    function initGoogleMaps() {
      var mapOptions = {
        zoom: 13.75,
        center: new google.maps.LatLng(-16.5069882,-68.136291),
        scrollwheel: false,
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
      if(vm.markers.length > 0){
        cacheMarkersList = _.filter(vm.markers, (marker) => {
          return marker.userId !== event.userId && findSellerInCollection(marker.userId);
        })
      }
      if (findSellerInCollection(event.userId)) {
        cacheMarkersList.push(newMarker(event));
      }
      _.forEach(vm.markers, (marker, index) => {
        vm.markers[index].setMap(null)
      });
      vm.markers=[];
      vm.markers = cacheMarkersList;
    }

    function findSellerInCollection (sellerId){
      return _.find(vm.sellersSelectedList, seller => {
        return seller.ci === sellerId
      })
    }

    function newMarker(obj) {
      let myLatLng = new google.maps.LatLng(obj.latitude, obj.longitude);
      return new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: obj.title,
        userId: obj.userId
      });
    }

    function getSellers() {
      return SellersTrackService.getSellers().then(response=>{
        vm.sellersList = response.data.users
      })
    }

    function selectAllSellers(setValue) {
      vm.selectAllSellersCheckbox = setValue || vm.selectAllSellersCheckbox;
      _.forEach(vm.sellersList, function (seller) {
        seller['active'] = vm.selectAllSellersCheckbox;
      });
      refreshSellersSelected();
    }

    function selectSeller() {
      refreshSellersSelected();
    }

    function refreshSellersSelected() {
      vm.sellersSelectedList = _.filter(vm.sellersList, {'active': true});
    }

    initialize();
  }
})();