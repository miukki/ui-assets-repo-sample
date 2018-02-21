'use strict';

angular.module('eicStudyTourWeb', [
  'ui.bootstrap',
  'animate',
  'menutoggle',
  'Tmpls',
  'TmplsBootstrap',
  'TmplsUISelect',
  'ngRoute',
  'activeTab',
  'staticRoutes',
  'pnavFooter',
  'ui.select',
  'ngSanitize'
])
.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}])

.controller('SelectDaysctrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: '4 Weeks'},
        {id: 2, name: '5 Weeks'},
        {id: 3, name: '8 Weeks'},
        {id: 4, name: '7 Days'},
        {id: 5, name: '15 Days'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}])

.controller('SelectAgeRangectrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'Grade 8-12'},
        {id: 2, name: 'High School'},
        {id: 3, name: 'College'},
        {id: 4, name: 'Age 15-22'},
        {id: 5, name: 'With parents'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}])

.controller('SelectAccommodationctrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'Dorms'},
        {id: 2, name: 'Student Apartments'},
        {id: 3, name: 'Homestay'},
        {id: 4, name: 'Hotel'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}])

.controller('SelectAcademyresultsctrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'Recommandation Letter'},
        {id: 2, name: 'Certificate'},
        {id: 3, name: 'Personal Evaluation'},
        {id: 4, name: 'Experience Certificate'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}])

.controller('SelectDeparturePortctrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'Shanghai'},
        {id: 2, name: 'Beijing'},
        {id: 3, name: 'Shenzhen'},
        {id: 4, name: 'Chengdu'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}])

.controller('NavController', ['$scope', 'serviceStaticRoutes', function($scope, serviceStaticRoutes){
  /*push routes to pnav for easy go throw all paths, just one line for easy usage*/
  var nv = this;
  nv.menuItems = [];
  nv.menuItems = nv.menuItems.concat(serviceStaticRoutes.menuItemsSet());


  nv.appLabel = 'Study Tour';
  nv.menuItems = nv.menuItems.concat([
    {
      header: '',
      items: [
        {title: 'search_results', uri: '/search_results', type: 'user'},
        ],
      isBasic: true
    }
  ]);

}])

.controller('mainController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.alerts = [
    { type: 'warning', msg: 'This tour is locked. New customers cannot be added.', class:'btn-danger'},
    { type: 'danger', msg: 'This tour is closed', class:'btn-danger' }
  ];
}])
.run([function() {
}])
.config(['$provide', '$routeProvider', function($provide, $routeProvider) {

  //Faye init
  $routeProvider.

    when('/', {
      redirectTo: '/home'
    }).

    when('/home', {
      templateUrl: 'static/home.tmpl',
    }).
    when('/customer_profile', {
      templateUrl: 'static/customer_profile.tmpl',
    }).
    when('/search_tour', {
      templateUrl: 'static/search/search_tour.tmpl',
      header: 'Search'
    }).
    when('/search_customers', {
      templateUrl: 'static/search/search_customers.tmpl',
      header: 'Search'
    }).
    when('/create_tour', {
      templateUrl: 'static/tour/create_tour.tmpl',
      header: 'Tours'
    }).
    when('/tours_active', {
      templateUrl: 'static/tour/tours_active.tmpl',
      header: 'Tours'
    }).
    when('/tours_locked', {
      templateUrl: 'static/tour/tours_locked.tmpl',
      header: 'Tours'
    }).
    when('/tours_closed', {
      templateUrl: 'static/tour/tours_closed.tmpl',
      header: 'Tours'
    }).
    when('/tours_closed', {
      templateUrl: 'static/tour/tours_closed.tmpl',
      header: 'Tours'
    }).
    when('/group_tour_overview', {
      templateUrl: 'static/tour/group_tour_overview.tmpl',
      header: 'Group Tour'
    }).
    when('/group_tour_edit', {
      templateUrl: 'static/tour/group_tour_edit.tmpl',
      header: 'Group Tour'
    }).
    when('/group_tour_customers', {
      templateUrl: 'static/tour/group_tour_customers.tmpl',
      header: 'Group Tour'
    }).
    when('/individual_tour_overview', {
      templateUrl: 'static/tour/individual_tour_overview.tmpl',
      header: 'Individual Tour'
    }).
    when('/individual_tour_edit', {
      templateUrl: 'static/tour/individual_tour_edit.tmpl',
      header: 'Individual Tour'
    }).
    when('/individual_tour_active', {
      templateUrl: 'static/tour/individual_tour_active.tmpl',
      header: 'Individual Tour'
    }).
    when('/individual_tour_completed', {
      templateUrl: 'static/tour/individual_tour_completed.tmpl',
      header: 'Individual Tour'
    }).
    when('/contracts_unassigned', {
      templateUrl: 'static/contracts/contracts_unassigned.tmpl',
      header: 'Contracts'
    }).
    when('/contracts_active', {
      templateUrl: 'static/contracts/contracts_active.tmpl',
      header: 'Contracts'
    }).
    when('/contracts_completed', {
      templateUrl: 'static/contracts/contracts_completed.tmpl',
      header: 'Contracts'
    }).


    //error
    when('/error/:id', {
      templateUrl: 'shared/error.tmpl',
      hidden: true
    }).

    otherwise({
      redirectTo: '/error/404'
    });

}]);


angular
  .module('eicStudyTourWeb')
  .directive('transcludeTemplate', priceTable);

priceTable.$inject = ['$parse'];

function priceTable($parse) {
  var directive = {
    restrict: 'EAC',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.src;
    }
  };
  return directive;
}

angular
  .module('eicStudyTourWeb')
  .controller('ErrorController', ErrorController);

ErrorController.$inject = ['$routeParams', '$window'];

function ErrorController ($routeParams, $window) {

  var self = this;
  self.errorCode = $routeParams.id || '404';
  self.launchPad = '';
  $routeParams.msg = $routeParams.id === '401' ? 'Unauthorized HTTP responses. Please login. ' : '';
  self.message = $routeParams.msg || 'Sorry, we can\'t display the page.';
  self.goBack = function() {
    $window.location.href = '/';
  };

}

angular
  .module('eicStudyTourWeb')
  .controller('mainController', mainController);

mainController.$inject = ['$scope', '$uibModal', '$log', '$location', '$rootScope'];

function mainController($scope, $uibModal, $log, $location, $rootScope) {

/* jshint validthis:true */
  var self = this;

  $rootScope.$on('$routeChangeSuccess', function(){
    if (/\?isFinished\=true/.test($location.$$url)) {
      this.isComplitted = true;
    }

  }.bind(self));


  self.items = [];
  self.open = function(size, tmpl) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/modal/' + tmpl + '.tmpl',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return self.items;
        }
      }
    });


    modalInstance.result.then(function (selectedItem) {
      //$scope.selected = selectedItem;
    });

  };
}

angular
  .module('ui.bootstrap.dropdown')
  .controller('DropdownCtrl', function ($scope, $log) {

  $scope.status = {
    isopen: false
  };
});

angular
.module('eicStudyTourWeb')
.controller('AlertCtrl', function ($scope) {
  $scope.alerts = [
    { type: 'warning', msg: 'This tour is locked. New customers cannot be added.', class:'btn-danger'},
    { type: 'danger', msg: 'This tour is closed', class:'btn-danger' }
  ];
});


angular
  .module('eicStudyTourWeb')
  .controller('formsModalCtrl', formsModalCtrl);

angular.module('eicStudyTourWeb')
  .controller('formsModalInstanceCtrl', formsModalInstanceCtrl);

formsModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];

function formsModalInstanceCtrl ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

}

formsModalCtrl.$inject = ['$scope', '$uibModal', '$log'];
function formsModalCtrl ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.openAssignTour = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/assign_tour_modal.tmpl',
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
  $scope.openAssignTourConfirm = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/assign_tour_confirm_modal.tmpl',
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
  $scope.openDisableContract = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/disable_contract_modal.tmpl',
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
  $scope.openAddCustomers = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/add_customers_modal.tmpl',
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
  $scope.openRemoveCustomers = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/remove_customers_modal.tmpl',
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
  $scope.openBatchAssignTour = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/batch_assign_tour_modal.tmpl',
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
  $scope.openBatchAssignTourConfirm = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/batch_assign_tour_confirm_modal.tmpl',
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
  $scope.openEditComments = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/edit_comments_modal.tmpl',
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
  $scope.openIndividualNotes = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/edit_individual_notes_modal.tmpl',
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
  $scope.editStudyTourInfo = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/edit_study_tour_info_modal.tmpl',
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
  $scope.openGroupNotes = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/edit_group_notes_modal.tmpl',
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
  $scope.openEmailCustomers = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/email_customers_modal.tmpl',
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
  $scope.openEmailSent = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/email_sent_modal.tmpl',
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
  $scope.openEmailNotSent = function (size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'static/modal/email_not_sent_modal.tmpl',
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

