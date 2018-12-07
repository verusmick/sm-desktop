(function () {
  'use strict';

  angular.module('app').factory('ReportsService', ReportsService);
  angular.module('app').directive('exportToCsv', exportToCsv);
  function ReportsService($http, $q, API_ENDPOINT) {
    return {
      getSellers: getSellers,
      getCoordinatesReport: getCoordinatesReport,
      getStatusGpsPerSeller: getStatusGpsPerSeller,
      getRoles: getRoles,
      getUsers: getUsers,
      bestSellers: bestSellers,
      getOrders: getOrders
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

    function getStatusGpsPerSeller(userId, since, until) {
      var deferred = $q.defer();
      since = since.toISOString().split("T")[0];
      until = until.toISOString().split("T")[0];
      $http.get(API_ENDPOINT + '/reports/getStatusGpsPerSeller?since=' + since + '&until=' + until + '&userId=' + userId)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getRoles() {
      let deferred = $q.defer();
      $http.get(API_ENDPOINT + '/roles')
        .then(function (response) {
          deferred.resolve(response.data.data.roles);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function getUsers() {
      var deferred = $q.defer();
      $http.get(API_ENDPOINT + '/users')
        .then(function (response) {
          deferred.resolve(response.data.data.users);
        }, function (response) {
          deferred.reject(response);
        })
      return deferred.promise;
    }

    function bestSellers(since, until) {
      let deferred = $q.defer();
      since = since.toISOString().split("T")[0];
      until = until.toISOString().split("T")[0];
      let users = [];

      getUsers().then(response => {
        users = response;
        $http.get(API_ENDPOINT + '/reports/bestSellers?since=' + since + '&until=' + until)
          .then(function (response) {
            let sellerList = response.data.data;
            let bestSellers = [];
            sellerList = _.groupBy(sellerList, 'user_id')
            _.forEach(sellerList, (items, index) => {
              let ordersCount = items.length, totalAmount = 0;
              _.forEach(items, (order, index) => {
                totalAmount = totalAmount + order.total
              });
              bestSellers.push({
                user_id: index,
                user: _.find(users, (item) => {
                  return item.ci === index
                }),
                ordersCount: ordersCount,
                orders: items,
                totalAmount: totalAmount
              });
            });
            deferred.resolve(_.orderBy(bestSellers, ['totalAmount'], ['desc']));
          }, function (response) {
            deferred.reject(response);
          });
      });

      return deferred.promise;
    }

    function getOrders(since, until) {
      let deferred = $q.defer();
      since = since.toISOString().split("T")[0];
      until = until.toISOString().split("T")[0];
      let users = [];

      getUsers().then(response => {
        users = response;
        $http.get(API_ENDPOINT + '/reports/orders?since=' + since + '&until=' + until).then(response => {
          let list = response.data.data;
          _.forEach(list, item => {
            item['user'] = _.find(users, user => {
              return user.ci === item.userId
            })
          })
          deferred.resolve(list);
        }, function (response) {
          deferred.reject(response);
        })

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
