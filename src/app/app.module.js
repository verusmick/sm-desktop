(function() {
  'use strict';

  angular.module('app', [
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ui.router',
    'ngStorage',
    'ngDialog'
  ])

  .filter("dateFilter", dateFilter);
  function dateFilter() {
    return function(input, start, end) {
      if(!start || !end){
        return input
      }
      var inputDate = new Date(input),
        startDate = new Date(start.setHours(0, 0, 1)),
        endDate = new Date(end.setHours(23,59,59)),
        result = [];

      for (var i=0, len = input.length; i < len; i++) {
        inputDate = new Date(input[i].time);
        if (startDate < inputDate && inputDate < endDate) {
          result.push(input[i]);
        }
      }
      return result;
    };
  };
})();
