(function () {
  'use strict';

  angular.module('app').factory('ReportsService', ReportsService);
  angular.module('app').directive('exportToCsv', exportToCsv);
  function ReportsService($http, $q, API_ENDPOINT) {
    return {
      getSellers: getSellers,
      getCoordinatesReport: getCoordinatesReport
    };

    function getSellers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users?roleFilter=visitador')
        .then(function (response) {
          let list = response.data.data.users;
          _.forEach(list, (seller, index) => {
            list[index]['label'] = `${seller.firstName} ${seller.firstSurname}`
          })
          deferred.resolve(list);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getCoordinatesReport(userId, since, until) {
      var deferred = $q.defer();
      since = since.toISOString().split("T")[0];
      until = until.toISOString().split("T")[0];
      $http.get(API_ENDPOINT + '/history/sellers?since=' + since + '&until=' + until + '&userId=' + userId)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }
  }

  function exportToCsv() {
    return {
      restrict: 'A',
      ngTable: '=',

      link: function (scope, element, attrs) {
        var el = element[0];
        element.bind('click', function (e) {
          var table = angular.element(document.getElementById('#reportTable'))[0];
          var csvString = '';
          for (var i = 0; i < table.rows.length; i++) {
            var rowData = table.rows[i].cells;
            for (var j = 0; j < rowData.length; j++) {
              csvString = csvString + rowData[j].innerHTML + ",";
            }
            csvString = csvString.substring(0, csvString.length - 1);
            csvString = csvString + "\n";
          }
          csvString = csvString.substring(0, csvString.length - 1);
          var a = $('<a/>', {
            style: 'display:none',
            href: 'data:application/octet-stream;base64,' + btoa(csvString),
            download: 'emailStatistics.csv'
          }).appendTo('body')
          a[0].click()
          a.remove();
        });
      }
    }
  }
})();
