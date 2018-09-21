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

    let  map;

    /////

    function initialize() {
      var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(-15.8277324, -68.9899946),
        scrollwheel: false,
        mapTypeId: 'roadmap'
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    initialize();
  }
})();