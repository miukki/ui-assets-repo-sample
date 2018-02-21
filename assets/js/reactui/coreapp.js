'use strict';

angular.module('coreApp', [
  'ui.bootstrap',
  'Tmpls',
  'TmplsBootstrap',
  'ngRoute',
  'activeTab',
  'staticRoutes',
  'transcludeTemplate'
])

.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}])

.controller('mainController', [function() {

}])
.config(['$provide', '$routeProvider', function($provide, $routeProvider) {

  //Faye init
  $routeProvider.
    when('/main', {
      templateUrl: 'main.tmpl',
    }).
    otherwise({
      redirectTo: '/main'
    });

}]);



