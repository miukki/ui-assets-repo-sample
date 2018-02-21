'use strict';

angular.module('coreApp', [
  'ui.bootstrap',
  'animate',
  'Tmpls',
  'TmplsBootstrap',
  'ngRoute',
  'activeTab',
  'staticRoutes'
])
.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

angular
  .module('coreApp')
  .controller('ErrorController', [function() {}]);

angular
  .module('coreApp')
  .run(Init);

Init.$inject = ['$rootScope', 'shareDataService', 'serviceStaticRoutes', '$log'];

function Init($rootScope, shareDataService, serviceStaticRoutes, $log) {

}


angular
  .module('coreApp')
  .config(configRouteProvider);
configRouteProvider.$inject = ['$provide', '$routeProvider'];

function configRouteProvider($provide, $routeProvider) {

  $routeProvider.

  when('/home', {
    templateUrl: 'static/home.tmpl',
    header: 'Home',
    title: 'Schools'
  }).
  when('/majors', {
    templateUrl: 'static/majors.tmpl',
    header: 'Home',
    title: 'Majors'
  }).
  when('/search-schools', {
    templateUrl: 'static/search-schools.tmpl',
    header: 'Search',
    title: 'Search Schools'
  }).
  when('/search-majors', {
    templateUrl: 'static/search-majors.tmpl',
    header: 'Search',
    title: 'Search Majors'
  }).

  otherwise({
    redirectTo: '/home'
  });



}

/**
 * @ngdoc object
 * @name coreApp.controller:HeaderController
 * @description
 * Controller for Heaer Templates Pages
 **/
angular
  .module('coreApp')
  .controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', '$route', 'shareDataService', '$log'];

function HeaderController($scope, $route, shareDataService, $log) {
  var self = this;

  var route = $route && $route.current && $route.current.$$route || {};
  $log.debug('route', route);

  self.title = route.title || route.header;
  self.tabs = shareDataService.getTabs(route.header);

  // var tabItems = shareDataService.getTabs(self.title);
  // self.tabs = route.tabs;

}

angular
  .module('coreApp')
  .controller('TabsController', function ($scope, $window) {
  $scope.model = {
    name: 'Tabs'
  };
});
  angular
  .module('coreApp')
  .controller('FilterController', FilterController);

FilterController.$inject = ['$scope', 'shareDataService', 'lodash'];

function FilterController ($scope, shareDataService, _) {
  var self = this;

  self.tabs = [{
    name: 'Template',
    tmpl: 'template'
  },{
    name: 'Cart',
    tmpl: 'cart'
  },
  {
    name: 'Product',
    tmpl: 'product'
  },
  {
    name: 'Contract',
    tmpl: 'contract'
  }
  ];

}


angular
  .module('coreApp')
  .controller('NavController', NavController);

NavController.$inject = ['$scope', 'serviceStaticRoutes', 'shareDataService', '$log'];

function NavController($scope, serviceStaticRoutes, shareDataService, $log) {
  var nv = this;

  //all items for menu (left sidebar)

  nv.menuItems = [].concat(serviceStaticRoutes.menuItemsSet(), [{
    header: '',
    items: [
      { title: 'Home', uri: '/home', type: 'home' },
      { title: 'Search', uri: '/search', type: 'search' },
      { title: 'New Users', uri: '/new_users', type: 'user' },
      { title: 'Applications', uri: '/applications', type: 'user' }
    ],
    isBasic: true
  }, {
    header: 'recent CUSTOMERS',
    items: [
      { title: 'Ka Ming Leung', uri: '/customer_profile' },
      { title: 'Sacha Altimas', uri: '#' },
      { title: 'Tim Kim', uri: '#' }
    ]
  }]);

  nv.appLabel = 'School DB CMS';

}

/**
 * @ngdoc service
 * @name coreApp.service:shareDataService
 * @requires
 **/

angular
  .module('coreApp')
  .factory('shareDataService', shareDataService);

shareDataService.$inject = ['$log'];

function shareDataService($log) {

  var savedData = {};

  function set(data) {
    savedData = angular.extend(savedData, data);
  }

  function get() {
    return savedData || {};
  }

  function getMenu() {
    return get().menu || [];
  }

  function getTabs(key) {
    return get().tabs[key] || [];
  }

  return {
    set: set,
    get: get,
    getMenu: getMenu,
    getTabs: getTabs
  };

}


angular
  .module('coreApp')
  .controller('mainController', ['$scope', '$rootScope', function($scope, $rootScope) {}]);

angular.module('coreApp')
  .controller('formsModalCtrl', formsModalCtrl);

formsModalCtrl.$inject = ['$scope', '$modal', '$log'];
function formsModalCtrl ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.openAddRoles = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'static/modal/add.rols.modal.tmpl',
      controller: 'formsModalInstanceCtrl',
      animation: true,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };

}

angular.module('coreApp')
  .controller('formsModalInstanceCtrl', formsModalInstanceCtrl);

formsModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'items'];

function formsModalInstanceCtrl ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

}

