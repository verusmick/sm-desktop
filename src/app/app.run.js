(function () {
  'use strict';

  angular.module('app').run(runBlock);

  /** @ngInject */
  function runBlock($document, $log, $rootScope, tmhDynamicLocale, $timeout, $transitions, $localStorage, $state) {
    $rootScope.$on('$translateChangeSuccess', function (event, data) { // eslint-disable-line angular/on-watch
      tmhDynamicLocale.set(data.language);
      $document[0].documentElement.setAttribute('lang', data.language);
    });

    $log.debug('App run block end');


    $transitions.onBefore({}, function (transition) {
      var tranTo = transition.to();
      if (tranTo.auth && !$localStorage['tk']) {
        $state.go('login');
        return false;
      }else if(tranTo.name ==='login' && $localStorage['tk']){
        $state.go('dashboard.home');
        return false;
      }
    });
  }
})();
