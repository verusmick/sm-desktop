(function () {
  'use strict';

  angular.module('app').factory('SellersTrackEvents', SellersTrackEvents);
  function SellersTrackEvents(API_ENDPOINT) {
    let evtSource,
      eventUrl = '/gpsTracking/sellers',
      running = false;

    return {
      start: function () {
        if (!this.isRunning()) {
          evtSource = new EventSource(API_ENDPOINT + eventUrl, {withCredentials: false});
          running = true;
        }
      },
      stop: function () {
        if (evtSource) {
          evtSource.close();
        }
        running = false;
      },
      addListeners: function (listeners) {
        for (var key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            evtSource.addEventListener(key, listeners[key]);
          }
        }
      },
      removeListeners: function (listeners) {
        for (var key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            evtSource.removeEventListener(key, listeners[key]);
          }
        }
      },
      isRunning: function () {
        return running;
      }
    }
  }
})();
