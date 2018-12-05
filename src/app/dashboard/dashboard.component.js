(function () {
  'use strict';

  angular.module('app').component('dashboard', {
    controller: DashboardController,
    controllerAs: 'vm',
    templateUrl: 'app/dashboard/dashboard.view.html',
  });

  /** @ngInject */
  function DashboardController($localStorage, $timeout, $state) {
    const vm = this;
    vm.logout = logout;
    vm.verifyResource = verifyResource;
    vm.user = $localStorage.usr;
    vm.menu = [
      {
        id: 'GPSpages',
        name: 'Geolocalización',
        expanded: true,
        icon: 'nc-icon nc-pin-3',
        childs: [
          {
            abbrev: 'VV',
            name: 'Visitadores / Vendedores',
            uiRef: 'dashboard.sellersTrack',
            resourceCode: 'desk_geoSellers'
          }
        ]
      },
      {
        id: 'historyPages',
        name: 'Historial',
        expanded: false,
        icon: 'fa fa-history',
        childs: [
          {
            abbrev: 'VVD',
            name: 'Visitador/Vendedor por dia',
            uiRef: 'dashboard.sellersPerDay',
            resourceCode: 'desk_historyPerDaySellers'
          }
        ]
      },
      {
        id: 'orderPages',
        name: 'Proformas',
        expanded: false,
        icon: 'nc-icon nc-paper',
        resourceCode: 'desk_orders',
        childs: [],
        uiRef: 'dashboard.orders'
      },
      {
        id: 'userPages',
        name: 'Usuarios',
        expanded: false,
        icon: 'fa fa-users',
        resourceCode: 'desk_geoSellers',
        childs: [
          {
            abbrev: 'LU',
            name: 'Lista De Usuarios',
            uiRef: 'dashboard.users'
          },
          {
            abbrev: 'NU',
            name: 'Nuevo Usuario',
            uiRef: 'dashboard.newUser'
          }
        ]
      },
      {
        id: 'reportsPages',
        name: 'Reportes',
        expanded: false,
        icon: 'nc-icon nc-chart-bar-32',
        resourceCode: 'desk_reports',
        childs: [
          {
            abbrev: 'CV',
            name: 'Coordenadas de Visitator',
            uiRef: 'dashboard.reportCoordinatesSeller'
          },
          {
            abbrev: 'GAV',
            name: 'GPS Activado x Visitador',
            uiRef: 'dashboard.users'
          },
          {
            abbrev: 'U',
            name: 'Usuarios',
            uiRef: 'dashboard.users'
          },
          {
            abbrev: 'MV',
            name: 'Mejores Visitadores',
            uiRef: 'dashboard.users'
          },
          {
            abbrev: 'P',
            name: 'Proformas',
            uiRef: 'dashboard.users'
          }
        ]
      }
    ]

    // Scope variables go here:
    // vm.variable = 'value';

    ////////////
    var transparent = true;
    var transparentDemo = true;
    var fixedTop = false;

    var navbar_initialized = false;
    var backgroundOrange = false;
    var sidebar_mini_active = false;
    var toggle_initialized = false;

    var seq = 0, delays = 80, durations = 500;
    var seq2 = 0, delays2 = 80, durations2 = 500;

    function initialize() {
      var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

        $('html').addClass('perfect-scrollbar-on');
      } else {
        $('html').addClass('perfect-scrollbar-off');
      }
    }

    $(document).ready(function () {
      ////
      if ($('.full-screen-map').length == 0 && $('.bd-docs').length == 0) {
        // On click navbar-collapse the menu will be white not transparent
        $('.collapse').on('show.bs.collapse', function () {
          $(this).closest('.navbar').removeClass('navbar-transparent').addClass('bg-white');
        }).on('hide.bs.collapse', function () {
          $(this).closest('.navbar').addClass('navbar-transparent').removeClass('bg-white');
        });
      }

      paperDashboard.initMinimizeSidebar();

      var $navbar = $('.navbar[color-on-scroll]');
      var scroll_distance = $navbar.attr('color-on-scroll') || 500;

      // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
      if ($('.navbar[color-on-scroll]').length != 0) {
        paperDashboard.checkScrollForTransparentNavbar();
        $(window).on('scroll', paperDashboard.checkScrollForTransparentNavbar)
      }

      $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
      }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
      });

      // Activate bootstrapSwitch
      $('.bootstrap-switch').each(function () {
        var $this = $(this);
        var data_on_label = $this.data('on-label') || '';
        var data_off_label = $this.data('off-label') || '';

        $this.bootstrapSwitch({
          onText: data_on_label,
          offText: data_off_label
        });
      });

    })

    $(document).on('click', '.navbar-toggle', function () {
      var $toggle = $(this);

      if (paperDashboard.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        paperDashboard.misc.navbar_menu_visible = 0;
        setTimeout(function () {
          $toggle.removeClass('toggled');
          $('#bodyClick').remove();
        }, 550);

      } else {
        setTimeout(function () {
          $toggle.addClass('toggled');
        }, 580);

        var div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function () {
          $('html').removeClass('nav-open');
          paperDashboard.misc.navbar_menu_visible = 0;
          setTimeout(function () {
            $toggle.removeClass('toggled');
            $('#bodyClick').remove();
          }, 550);
        });

        $('html').addClass('nav-open');
        paperDashboard.misc.navbar_menu_visible = 1;
      }
    });

    $(window).resize(function () {
      // reset the seq for charts drawing animations
      seq = seq2 = 0;

      if ($('.full-screen-map').length == 0 && $('.bd-docs').length == 0) {
        var $navbar = $('.navbar');
        var isExpanded = $('.navbar').find('[data-toggle="collapse"]').attr("aria-expanded");
        if ($navbar.hasClass('bg-white') && $(window).width() > 991) {
          $navbar.removeClass('bg-white').addClass('navbar-transparent');
        } else if ($navbar.hasClass('navbar-transparent') && $(window).width() < 991 && isExpanded != "false") {
          $navbar.addClass('bg-white').removeClass('navbar-transparent');
        }
      }
    });

    var paperDashboard = {
      misc: {
        navbar_menu_visible: 0
      },

      initMinimizeSidebar: function () {
        if ($('.sidebar-mini').length != 0) {
          sidebar_mini_active = true;
        }

        $('#minimizeSidebar').click(function () {
          var $btn = $(this);

          if (sidebar_mini_active == true) {
            $('body').addClass('sidebar-mini');
            sidebar_mini_active = true;
            paperDashboard.showSidebarMessage('Sidebar mini activated...');
          } else {
            $('body').removeClass('sidebar-mini');
            sidebar_mini_active = false;
            paperDashboard.showSidebarMessage('Sidebar mini deactivated...');
          }

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function () {
            clearInterval(simulateWindowResize);
          }, 1000);
        });
      },

      showSidebarMessage: function (message) {
        try {
          $.notify({
            icon: "now-ui-icons ui-1_bell-53",
            message: message
          }, {
            type: 'info',
            timer: 4000,
            placement: {
              from: 'top',
              align: 'right'
            }
          });
        } catch (e) {
          console.log('Notify library is missing, please make sure you have the notifications library added.');
        }
      }
    };

    function verifyResource(item) {
      let resources = $localStorage['usr'].resources;
      if (item.resourceCode && _.includes(resources, item.resourceCode)) {
        item['show'] = true
      } else if (item.childs && item.childs.length > 0) {
        let flagShowItem = true;
        _.each(item.childs, child => {
          child['show'] = _.includes(resources, child.resourceCode)
          if (flagShowItem && child['show']) {
            item['show'] = true;
            flagShowItem = false;
          }
        })
      } else {
        item['show'] = false;
      }
    }

    initialize();

    /////end  paper dashboard functions
    function logout() {
      delete $localStorage['usr'];
      delete $localStorage['tk'];
      $timeout(function () {
        $state.go('login');
      }, 200)
    }
  }
})();
